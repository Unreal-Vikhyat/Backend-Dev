function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function countVowels(str) {
    return (str.match(/[aeiouAEIOU]/g)).length;
}

module.exports = {
    capitalizeString,
    reverseString,
    countVowels
};
