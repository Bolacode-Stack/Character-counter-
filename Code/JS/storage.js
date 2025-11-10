class Storage {
  static addStatsToStorage(count) {
    let stats = this.getStatsfromStorage();

    stats.push(count)
    localStorage.setItem("totalCharacters", JSON.stringify(stats));
    return stats;
  }

  static getStatsfromStorage()  {
    let stats;
       if (localStorage.getItem("totalCharacters") == null) {
        stats = [];
    } else {
        stats = JSON.parse(localStorage.getItem("totalCharacters"));
    }
    return stats;
  }
}

export default Storage;