module.exports = class peopleModel {
    constructor(
        nombre,
        altura,
        peso,
        cabello,
        piel,
        ojo,
        nacimiento,
        genero,
        natal,
        created,
        editad,
        url
    ) {
        this.nombre = nombre;
        this.altura = altura;
        this.peso = peso;
        this.cabello = cabello;
        this.piel = piel;
        this.ojo = ojo;
        this.nacimiento = nacimiento;
        this.genero = genero;
        this.natal = natal;
        this.created = created;
        this.editad = editad;
        this.url = url
    }
};