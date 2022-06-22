class Person {
    constructor(
        name,
        lastName,
        birthDate,
        email,
        contact,
        telephone,
        office
    ) {
        this.name = name;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
        this.contact = contact;
        this.telephone = telephone;
        this.office = office;

    }

}

class Filter {
    static registeredPeople = [];

    static createPeopleCard({ name, lastName, email, office }) {
        const personCard = document.createElement('li');
        const personName = document.createElement('h4');
        const personEmail = document.createElement('p');
        const personOffice = document.createElement('p');

        personName.innerText = `${name} ${lastName}`;
        personEmail.innerText = email;
        personOffice.innerText = office;

        personCard.append(personName, personEmail, personOffice);

        return personCard;
    }

    static listPeople(peopleData) {
        const peopleList = document.getElementById('lista-de-alunos');

        peopleList.innerHTML = '';

        peopleData.forEach((person) => {
            const newPerson = this.createPeopleCard(person);

            peopleList.append(newPerson);
        })
    }

    static filterPeople(searchOffice) {
        if(searchOffice === 'Todos') return this.registeredPeople;
        return this.registeredPeople.filter(({ office }) => office === searchOffice);
    }

    static filterByOffice() {
        const officeOption = document.getElementById('cargoOption').value;
        const filteredPeople = this.filterPeople(officeOption);

        this.listPeople(filteredPeople);
    }
}

const registeredButton = document.getElementById('register-button');

registeredButton.addEventListener('click', (event) => {
    event.preventDefault();

    const formInputs = document.querySelectorAll('.field');
    const registerInfo = [];
    let addPerson = true

    formInputs.forEach((input) => {
        if(input.value === '') addPerson = false;
        registerInfo.push(input.value)
    })

    if(addPerson) {
        if(Filter.registeredPeople.some(({ email }) => email === registerInfo[3])) alert('Email já cadastrado');
        else {
            const totalPeople = document.getElementById('total-alunos');

            Filter.registeredPeople.push(new Person(...registerInfo));
            totalPeople.innerText = Filter.registeredPeople.length;
        }
    
        Filter.filterByOffice();
    } else alert('Adicione todas as informações')
})

const searchButton = document.getElementById('btn');

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    Filter.filterByOffice();
})