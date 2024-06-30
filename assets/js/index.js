document.querySelector("header>nav").querySelectorAll("ul>li>a").forEach((e) => {
    e.addEventListener("mouseleave", (e) => {
        e.target.classList.add("out")
        setTimeout(() => {
            e.target.classList.remove("out")
        }, 400)
    })
})

const handleExitWindow = (e) => {
    e.target.parentNode.parentNode.hidden = true
    e.target.parentNode.innerHTML = ""
}

const validateTranslate = (carousel = document.querySelector(".window .carousel")) => {
    const translate = carousel.style.transform.substring(11, carousel.style.transform.length - 2)
    const larrow = carousel.parentNode.querySelector(".left.arrow")
    const rarrow = carousel.parentNode.querySelector(".right.arrow")
    if (translate == 0) {
        larrow.setAttribute("disabled", "true")
    } else if (larrow.hasAttribute("disabled")) {
        larrow.removeAttribute("disabled", "true")
    }
    if (translate == (carousel.children.length - 1) * -100) {
        rarrow.setAttribute("disabled", "true")
    } else if (translate == carousel.children.length * -100) {
        rarrow.setAttribute("disabled", "true")
    } else if (rarrow.hasAttribute("disabled")) {
        rarrow.removeAttribute("disabled", "true")
    }
}

const handleLarrow = (e) => {
    const carousel = e.target.parentNode.querySelector(".carousel")
    const translate = carousel.style.transform.substring(11, carousel.style.transform.length - 2)
    carousel.style.transform = `translateX(${parseInt(translate) + 100}%)`
    validateTranslate(carousel)
}
const handleRarrow = (e) => {
    const carousel = e.target.parentNode.querySelector(".carousel")
    const translate = carousel.style.transform.substring(11, carousel.style.transform.length - 2)
    carousel.style.transform = `translateX(${parseInt(translate) - 100}%)`
    validateTranslate(carousel)
}

document.querySelectorAll(".portfolio-section .card.link").forEach((e) => {
    const tab = document.querySelector(".portfolio-section .window>div")
    e.addEventListener("click", () => {
        const exit = document.createElement("a")
        exit.classList.add("exit")
        exit.addEventListener("click", handleExitWindow)
        exit.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m15.5 15.5l-10-10zm0-10l-10 10" /></svg>'
        const title = document.createElement("h3")
        title.classList.add("title")
        title.innerHTML = e.querySelector(".title").innerHTML
        const description = document.createElement("span")
        description.classList.add("description")
        description.innerHTML = e.querySelector(".description").innerHTML

        tab.appendChild(exit)
        tab.appendChild(title)
        tab.appendChild(description)

        if (e.querySelector(".images")) {
            const wrapper = document.createElement("div")
            wrapper.classList.add("wrapper")
            const carousel = document.createElement("div")
            carousel.classList.add("carousel")
            carousel.style.transform = "translateX(0%)"
            const larrow = document.createElement("a")
            const rarrow = document.createElement("a")
            larrow.classList.add("left", "arrow")
            rarrow.classList.add("right", "arrow")
            larrow.addEventListener("click", handleLarrow)
            rarrow.addEventListener("click", handleRarrow)
            larrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18.464 2.114a.998.998 0 0 0-1.033.063l-13 9a1.003 1.003 0 0 0 0 1.645l13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-.536-.886M17 19.091L6.757 12L17 4.909z" /></svg>'
            rarrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A.998.998 0 0 0 5 3v18a1 1 0 0 0 .536.886M7 4.909L17.243 12L7 19.091z" /></svg>'

            e.querySelector(".images").querySelectorAll("span").forEach((e) => {
                const image = document.createElement("img")
                image.src = e.textContent
                carousel.appendChild(image)
            })
            wrapper.appendChild(carousel)
            wrapper.appendChild(larrow)
            wrapper.appendChild(rarrow)
            tab.appendChild(wrapper)

            validateTranslate()
        }

        if (e.querySelector(".videos")) {
            e.querySelector(".videos").querySelectorAll("span").forEach((e) => {
                const animation = document.createElement("div")
                animation.classList.add("animation")

                const source = document.createElement("source")
                source.src = e.textContent
                source.type = "video/mp4"

                const video = document.createElement("video")
                video.disablePictureInPicture = true
                if (e.getAttribute("behaviour") == "automatic") {
                    video.autoplay = true
                    video.loop = true
                    video.muted = true
                } else if (e.getAttribute("behaviour") == "manual") {
                    video.controls = true
                    video.autoplay = false
                    video.loop = false
                    video.muted = false
                }
                video.appendChild(source)
                animation.appendChild(video)

                tab.appendChild(animation)
            })
            tab.parentNode.removeAttribute("hidden")
        }
    })
})