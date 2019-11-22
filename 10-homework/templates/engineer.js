



module.exports = function (res) {

    const block = `
<div class="card mainCard">
        <h4 class="card-header engineer"><span class="bold">${res.name}</span><br class="break">${res.role}</h4>
        <div class="card-body">
          <div class="card subText">
            <p><span class="bold">ID: </span> ${res.id}</p>
          </div>
          <div class="card subText">
            <p><span class="bold">Email: </span> ${res.email}</p>
          </div>
          <div class="card subText">
            <p><span class="bold">Github: </span>${res.github}</p>
          </div>
        </div>
      </div>
      `
      return block;
}