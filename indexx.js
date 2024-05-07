"use strict";
class TodoList {
    constructor(id, name, completed) {
        this.id = id;
        this.name = name;
        this.completed = completed;
    }
}
class ListMain {
    constructor() {
        this.list = [];
        this.loadListFromLocalStorage();
    }
    loadListFromLocalStorage() {
        const playerLocal = localStorage.getItem("listWork");
        this.list = playerLocal ? JSON.parse(playerLocal) : [];
    }
    renderJob() {
        const table = document.querySelector("table");
        const countElement = document.querySelector("#count");
        if (table && countElement) {
            table.innerHTML = this.list.map(work => this.renderJobRow(work)).join("");
            countElement.innerHTML = this.renderLength();
        }
        this.saveToLocalStorage();
    }
    renderLength() {
        return `${this.list.length}`;
    }
    renderJobRow(work) {
        return `
            <tr>
                <td><input type="checkbox" id="todo_${work.id}" ${work.completed ? 'checked' : ''}></td>
                <td>${work.name}</td>
                <td><button onclick="group_list.updateJob(${work.id})">Change Info</button></td>
                <td><button class="deleteBtn" onclick="group_list.deleteJob(${work.id})">Delete</button></td>
            </tr>
        `;
    }
    saveToLocalStorage() {
        localStorage.setItem('listWork', JSON.stringify(this.list));
    }
    createJob(name) {
        if (!name.trim()) {
            alert("Tên công việc không được để trống.");
            return;
        }
        if (this.isJobNameUnique(name)) {
            const id = this.generateRandomId();
            const newJob = new TodoList(id, name, true);
            this.list.push(newJob);
            this.renderJob();
        }
        else {
            alert("Tên công việc đã tồn tại. Vui lòng chọn tên khác.");
        }
    }
    isJobNameUnique(name) {
        return this.list.every(job => job.name !== name);
    }
    updateJob(id) {
        const index = this.list.findIndex(work => work.id === id);
        if (index !== -1) {
            const newName = prompt("Nhập tên mới", this.list[index].name);
            if (newName !== null && newName.trim() !== '') {
                this.list[index].name = newName;
                this.renderJob();
            }
        }
    }
    deleteJob(id) {
        const index = this.list.findIndex(work => work.id === id);
        if (index !== -1) {
            const confirmation = confirm("Bạn có chắc chắn muốn xóa công việc này?");
            if (confirmation) {
                this.list.splice(index, 1);
                this.renderJob();
            }
        }
    }
    generateRandomId() {
        return Math.floor(Math.random() * 1000);
    }
    deleteAll() {
        const check = confirm("chac la xoa het khong ??");
        if (check) {
            localStorage.removeItem('listWork');
        }
    }
}
// khoi tao 
const group_list = new ListMain();
group_list.renderJob();
const add = document.querySelector("#add");
add === null || add === void 0 ? void 0 : add.addEventListener("click", () => {
    const input = document.getElementById("input");
    if (input.value) {
        group_list.createJob(input.value);
    }
    else {
        alert("Tên công việc không được để trống.");
    }
});
const deleteAll = document.querySelector("#deleteAll");
deleteAll === null || deleteAll === void 0 ? void 0 : deleteAll.addEventListener("click", () => {
    group_list.deleteAll();
});
