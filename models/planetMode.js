module.exports = class planetModel {
    constructor(
        nombre,
        rotacion,
        orbita,
        diametro,
        clima,
        gravedad,
        terreno,
        agua,
        popularidad,
        residentes,
        films,
        creado,
        editado,
        url,
    ) {
        this.nombre = nombre;
        this.rotacion = rotacion;
        this.orbita = orbita;
        this.diametro = diametro;
        this.clima = clima;
        this.gravedad = gravedad;
        this.terreno = terreno;
        this.agua = agua;
        this.popularidad = popularidad;
        this.residentes = residentes;
        this.films = films;
        this.creado = creado;
        this.editado = editado;
        this.url = url
    }
};