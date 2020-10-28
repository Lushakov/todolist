//Input: row of table from tasksData; some data for check;
//Output: boolean;

const filters = {}
filters.search = (row, str) => str ? row.title.toLocaleLowerCase().includes(str.toLocaleLowerCase()) : true
filters.dateFrom = (row, date) => date ? row.date > date : true
filters.dateTo = (row, date) => date ? row.date < date : true

//============================================================//

const filtersData = {}
const boolResults = {};
for(let name in filters) boolResults[name] = []

const apply = (filter, tasksData, fData) => {
    filtersData[filter] = fData;
    return tasksData.map((row, index) => {
        boolResults[filter][index] = filters[filter](row, fData)
        row.shown = AND_forAllResults(index);
        return row;
    })
}

const onCRUD = (tasksData) => { //Only before every CRUD operation on taskData. For other cases, use "apply"
    for(let name in boolResults) boolResults[name].splice(tasksData.length)

    return tasksData.map((row, index) => {
        for(let name in filters) {
            const fData = filtersData[name];
            boolResults[name][index] = fData ? filters[name](row, fData) : true
        }
        row.shown = AND_forAllResults(index);
        return row;
    })
}

const AND_forAllResults = index => {
    for(let name in boolResults) {
        if(boolResults[name][index] === false) return false // here we use an "exact comparison" to skip cases when the array is empty
    }
    return true
}

const debag = (e) => {
    console.log(
        `Debag event: ${e}\nfiltersData:`, filtersData,
        '\nboolResults: ', boolResults);
}

export {apply, onCRUD, debag};