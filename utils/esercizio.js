class Animale {
  constructor(nome, specie) {
    this.nome = nome;
    this.specie = specie;
  }

  presentati() {
    return `Ciao, sono ${this.nome}, un ${this.specie}.`;
  }
}

class Cane extends Animale {
  constructor(nome, specie, razza) {
    super(nome, specie);
    this.razza = razza;
  }
  presentati() {
    return `${super.presentati()}E sono di razza ${this.razza}`;
  }
}

class Veicolo {
  constructor(marca, modello) {
    this.marca = marca;
    this.modello = modello;
  }

  datiVeicolo() {
    return `Marca: ${this.marca}, Modello: ${this.modello}`;
  }
}

class Auto extends Veicolo {
  constructor(marca, modello, numeroPorte) {
    super(marca, modello);
    this.numeroPorte = numeroPorte;
  }
  datiAuto() {
    return `${super.datiVeicolo}, Numero Porte: ${this.numeroPorte}`;
  }
}

class Persona {
  constructor(nome, eta) {
    this.nome = nome;
    this.eta = eta;
  }

  presentati() {
    return `Ciao, mi chiamo ${this.nome} e ho ${this.eta} anni.`;
  }
}

class Studente extends Persona {
  constructor(nome, eta, universita) {
    super(nome, eta);
    this.universita = universita;
  }
  presentati() {
    return `${super.presentati}. Vado all'università ${this.universita}`;
  }
}

class Prodotto {
  constructor(nome, prezzo) {
    this.nome = nome;
    this.prezzo = prezzo;
  }

  dettagli() {
    return `Nome prodotto: ${this.nome}, Prezzo: €${this.prezzo}`;
  }
}

class Elettronica extends Prodotto {
  constructor(nome, prezzo, garanzia) {
    super(nome, prezzo);
    this.garanzia = garanzia;
  }
  dettagli() {
    return `${super.dettagli}. La garanzia è ${this.garanzia}`;
  }
}
