//Masks
const nameMask = (value: any) => {
    return value
        .replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g, "")
}

const numberMask = (value: any) => {
    return value
        .replace(/\D/g, "")
}

const phoneMask = (value: any) => {
    return value
        .replace(/\D/g, "")
        .replace(/( )+/g, ' ')
        .replace(/^(\d{2})(\d)/g, "($1)$2")
        .replace(/^(\d{3})(\d)/g, "$1.$2")
        .replace(/(\d{5})(\d{1,2})/, " $1-$2")
        .replace(/(-\d{4})\d+?$/, "$1")
};

const cepMask = (value: any) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1$2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{3})\d+?$/, "$1");
}

export default { nameMask, numberMask, phoneMask, cepMask }