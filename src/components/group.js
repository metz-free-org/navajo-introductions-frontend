class Group {
    constructor(groupJSON) {
        this.id = groupJSON.id
        this.name = groupJSON.name
        this.color = groupJSON.color
        this.clans = []
        this.adapter = new ClansAdapter()
        this.initBindings()
    }

    initBindings() {
        this.clansContainer = document.getElementById('clan-view-container')
        this.dropContainer = document.getElementById('clan-drop-container')
    }

    renderButton() {
        const button = document.createElement('label')
        const radio = document.createElement('input')
        radio.setAttribute("type", "radio")
        radio.setAttribute("name", "groups")
        radio.setAttribute("autocomplete", "off")
        radio.addEventListener('click', this.fetchAndLoadClans.bind(this))
        radio.setAttribute("id", this.id)
        button.innerHTML = `${this.id}`
        button.className = 'btn btn-secondary'
        button.style.textShadow = "2px 2px 6px #ffffff"
        button.style.color = "#000000"
        button.style.backgroundColor = this.color
        button.appendChild(radio)
        return button
    }

    fetchAndLoadClans(event) {
        this.clans = []
        this.clansContainer.innerHTML = `<h3>${this.name}</h3>`
        this.clansContainer.style.backgroundColor = this.color
        this.adapter
        .getClans(event.target.id)
        .then(group => {
            group.clans.forEach(clan => this.clans.push(new Clan(clan)))
        })
        .then(() => {
            this.render()  
        })  
    }

    render() {
        const clanButtons = this.clans.map(clan => clan.renderClan())
        clanButtons.forEach(clanButton => {
            this.clansContainer.appendChild(clanButton)
        }) 
    }

}