class ValidateCPF {
  constructor(sentCpf) {
    Object.defineProperty(this, 'cleanCpf', {
      writable: false,
      enumerable: true,
      configurable: false,
      value: sentCpf.replace(/\D+/g, '')
    });
  }

  isSequence() {
    return this.cleanCpf[0].repeat(this.cleanCpf.length) === this.cleanCpf;
  }

  static generateDigit(cpfWithoutDigit) {
    const cpfArray = Array.from(cpfWithoutDigit);

    let regressive = cpfArray.length + 1;

    const total = cpfArray.reduce((ac, value) => {
      ac += (regressive * Number(value));
      regressive--;
      return ac;
    }, 0);

    const digit = 11 - (total % 11);
    
    return digit > 9 ? '0' : String(digit);
  }

  generateNewCpf() {
    const cpfWithoutDigit = this.cleanCpf.slice(0, -2);
    const digit1 = ValidateCPF.generateDigit(cpfWithoutDigit);
    const digit2 = ValidateCPF.generateDigit(cpfWithoutDigit + digit1);

    this.newCpf = cpfWithoutDigit + digit1 + digit2;
  }

  validate() {
    if (!this.cleanCpf) return false;
    if (typeof this.cleanCpf !== 'string') return false;
    if (this.cleanCpf.length !== 11) return false;
    if (this.isSequence()) return false;
    
    this.generateNewCpf();

    return this.newCpf === this.cleanCpf;
  }
}