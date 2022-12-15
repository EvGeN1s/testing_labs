const axios = require('axios');
const fs = require('fs');
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

const baseLink = 'https://statler.ru/';
let validLinks = 0;
let invalidLinks = 0;
const visitedLinks = [baseLink]

function convertToAbsolutePath(link) {
    if (link.includes('about:blank#')) {
        return null
    }
    if (link.includes(baseLink)) {
        return link
    }
    if (link.includes('tel') || link.includes('mailto') || link.includes('tg', 0)) {
        return null
    }
    if (link.includes('http', 0)) {
        return null
    }

    return baseLink + link
}

async function getLinks(link) {
    if (link === undefined) {
        return
    }
    await axios.get(link)
        .then(async response => {
            validLinks++
            fs.appendFileSync("./valid_links.txt", `${link} - ${response.status}\n`)
            const dom = new JSDOM(response.data);

            let links = Array.from(dom.window.document.querySelectorAll("a, link")).map(i => i.href.replace(/^\//, ''))
            //let media = Array.from(dom.window.document.querySelectorAll("img, script[src], style[src]")).map(i => i.src.replace(/^\//, ''))

            //links = links.concat(media)

            if (!links) {
                return;
            }

            links = links.map(i => {
                let newLink = convertToAbsolutePath(i)
                if (newLink !== null && newLink !== undefined && !visitedLinks.includes(newLink)) {
                    visitedLinks.push(newLink)
                    return newLink
                }
            })

            for (const link of links) {
                await getLinks(link)
            }
        }).catch(err => {
            if (err.response === undefined) {
                console.log(link)
                console.log(err.message)
                return
            }

            let status = err.response.status

            if (status >= 400) {
                invalidLinks++
                fs.appendFileSync("./invalid_links.txt", `${link} - ${status}\n`)
            } else {
                validLinks++
                fs.appendFileSync("./valid_links.txt", `${link} - ${status}\n`)
            }
        })
    ;
}

async function main() {

    const date = new Date();

    fs.writeFileSync("./valid_links.txt", "")
    fs.writeFileSync("./invalid_links.txt", "")

    await getLinks(baseLink).then(r => {
    })

    fs.appendFileSync("./valid_links.txt", `Links count: ${validLinks}\nDate: ${date}\n`)
    fs.appendFileSync("./invalid_links.txt", `Links count: ${invalidLinks}\nDate: ${date}\n`)
}

main()




