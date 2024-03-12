const startButton = document.querySelector(".emloe-button");
const formSkillLevel = document.querySelector(".emloe-skillLevel");
const formHiring = document.querySelector(".emloe-hiring");
const formDriverLicence = document.querySelector(".emloe-driverLicense");
const formYearsOfExperience = document.querySelector(".emloe-yearsOfExperience");
const name = document.querySelector("#name");
const secondName = document.querySelector("#secondname");
const age = document.querySelector("#age");
const organization = document.querySelector("#organization");
const jobInput = document.querySelector("#jobTitle");
const skillLevel = document.querySelector("#skillLevel");
const hiring = document.querySelector("#hiring");
const driverLicense = document.querySelector("#driverLicense");
const yearsOfExperience = document.querySelector("#yearsOfExperience");

let emploersData = [];

class emploe {
    constructor(name, secondName, age, jobTitle, organization) {
        this.name = name;
        this.secondName = secondName;
        this.age = age;
        this.jobTitle = jobTitle;
        this.organization = organization;
    }
}

class lockSmith extends emploe {
    constructor(name, secondName, age, jobTitle, organization, skillLevel, hiring) {
        super(name, secondName, age, jobTitle, organization);
        this.skillLevel = skillLevel;
        this.hiring = hiring;
        // this.jobTitle = "Плотник";
    }
}

class driver extends emploe {
    constructor(name, secondName, age, jobTitle, organization, driverLicense, yearsOfExperience) {
        super(name, secondName, age, jobTitle, organization);
        this.driverLicense = driverLicense;
        this.yearsOfExperience = yearsOfExperience;
        // this.jobTitle = "Водитель";
    }
}


window.addEventListener('load', function () {
    emploersData = appData.loadinData();
    appData.addEmploeForms()
    // if (emploersData) {
    //     emploersData.forEach(data => {
    //         if (data.jobTitle === "Плотник") {
    //             createLockSmith(data);
    //         } else if (data.jobTitle === "Водитель") {
    //             createDriver(data);
    //         }
    //     });
    // }
});


const appData = {


    init: function () {
        startButton.addEventListener("click", this.start);
        this.changeEmploeVariants();
        const jobSelect = document.querySelector("#jobTitle");
        // this.deleteForm();
        this.deleteForms();
        // this.updateData();
    },

    start: function () {
        // appData.addEmploers();
        appData.addEmploeForms();
        appData.clearForms();



    },

    changeEmploeVariants: function () {
        const jobSelect = document.querySelector("#jobTitle");
        jobSelect.addEventListener("change", (el) => {
            const currentTarget = el.currentTarget;
            if (currentTarget.value === "Плотник") {
                formDriverLicence.style = "display:none";
                formYearsOfExperience.style = "display:none";
                formSkillLevel.style = "display:flex";
                formHiring.style = "display:flex";
            } else if (currentTarget.value === "Водитeль") {
                formSkillLevel.style = "display:none";
                formHiring.style = "display:none";
                formDriverLicence.style = "display:flex";
                formYearsOfExperience.style = "display:flex";
            }
        });
    },

    // saveData: function () {
    //     saveData()

    // },

    clearForms: function () {

        name.value = "";
        secondName.value = "";
        age.value = "";
        organization.value = "";
        jobInput.value = "";
        skillLevel.value = "";
        hiring.value = "";
        driverLicense.value = "";
        yearsOfExperience.value = "";
        formSkillLevel.value = "";
        formHiring.value = "";
        formDriverLicence.value = "";
        formYearsOfExperience.value = "";
    },



    addEmploeForms: function () {
        const inputName = document.querySelector("#name");
        const inputSecondName = document.querySelector("#secondname");
        const inputAge = document.querySelector("#age");
        const inputOrganization = document.querySelector("#organization");
        const inputJobInput = document.querySelector("#jobTitle");
        const inputSkillLevel = document.querySelector("#skillLevel");
        const inputHiring = document.querySelector("#hiring");
        const inputDriverLicense = document.querySelector("#driverLicense");
        const inputYearsOfExperience = document.querySelector("#yearsOfExperience");


        let newEmploer = {

            name: inputName.value,
            surname: inputSecondName.value,
            age: inputAge.value,
            organization: inputOrganization.value,
            jobInput: inputJobInput.value,
            skillLevel: inputSkillLevel.value,
            hiring: inputHiring.value,
            driverLicense: inputDriverLicense.value,
            yearsOfExperience: inputYearsOfExperience.value,

        }
        this.drawTableElements(emploersData);

        console.log(emploersData);
        emploersData.push(newEmploer);

    },

    drawTableElements: function (array) {

        const emploersList = document.querySelector("#employeeList");

        emploersList.innerHTML = ""

        array.forEach((data, index) => {

            const newRow = document.createElement('tr');

            newRow.setAttribute('data-number', index)

            newRow.innerHTML =
                `
                <td>${data.name}</td>
                <td>${data.surname}</td>
                <td>${data.age}</td>
                <td>${data.organization}</td>
                <td>${data.jobInput}</td>
                <td>${data.skillLevel}</td>
                <td>${data.hiring}</td>
                <td>${data.driverLicense}</td>
                <td>${data.yearsOfExperience}</td>
                <td><button class="delete-btn">Удалить</button></td>
                `
            this.saveData()

            emploersList.append(newRow);
        })

    },

    deleteForms: function () {

        const emploeTable = document.querySelector("#employeeList");

        emploeTable.addEventListener('click', (e) => {

            if (e.target.closest('.delete-btn')) {
                const row = e.target.closest('tr');
                const rowNumber = row.getAttribute('data-number');

                emploersData = emploersData.filter((el, index) => index !== +rowNumber);

                this.drawTableElements(emploersData)
            };
            this.saveData()

        });
    },

    saveData: function () {
        localStorage.setItem('EmploersData', JSON.stringify(emploersData))
    },

    loadinData: function () {
        const loadData = JSON.parse(localStorage.getItem('EmploersData'))
        return loadData;
    },

    updateData: function () {

    },


};



appData.init();
