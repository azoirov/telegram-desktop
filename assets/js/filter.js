function filterChats(keyword){
    keyword = keyword.toLowerCase();
    let sortedUsers = DATA.users.filter(function(element){
        let searchData = element.searchData;
        let getUserTitle = searchData.toLowerCase();
        let filtered = getUserTitle.includes(keyword);
        return filtered
    })
    return sortedUsers
}


searchInput.addEventListener('keyup', event=>{
    let showFilter = filterChats(searchInput.value);
    renderChats(showFilter)
    if (!list.innerHTML) {
        list.append(notFound);
    }
});
