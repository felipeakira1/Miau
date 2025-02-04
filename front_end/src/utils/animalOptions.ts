export const speciesOptions = [
    { value: "Dog", label: "Cachorro"},
    { value: "Cat", label: "Gato"}
]

export const breedOptions : { [key: string] : { value: string; label: string}[]} = {
    Dog: [
        { value: "Labrador", label: "Labrador" },
        { value: "Bulldog", label: "Bulldog" },
        { value: "Poodle", label: "Poodle" },
    ],
    Cat: [
        { value: "Siamese", label: "Siamês" },
        { value: "Persian", label: "Persa" },
        { value: "Mainecoon", label: "Maine Coon" },
    ],
}

export function getSpeciesLabel(value: string): string {
    return speciesOptions.find(species => species.value === value)?.label || "Desconhecido";
}

export function getBreedLabel(species: string, breedValue: string): string {
    return breedOptions[species]?.find(breed => breed.value === breedValue)?.label || "Desconhecido";
}