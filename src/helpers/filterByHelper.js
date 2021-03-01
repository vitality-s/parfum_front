export const filterByHelper = (card, filterValue, searchQuery) => {
    switch (filterValue) {
        case "Мужские":
            return card.filter((i) => i.gender === filterValue)
        case "Женские":
            return card.filter((i) => i.gender === filterValue)
        case "Общие":
            return card.filter((i) => i.gender === filterValue)
        case "Марка":
            return card.filter((i) => i.model.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0)
        default:
            return card;
    }
}