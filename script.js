// modal btn
const addStudentBtn = document.querySelector("[data-add-btn]");

// modal
const registrationModal = document.getElementById("add_student_modal");
const closeModalBtn = registrationModal.querySelector("[data-cancel-btn]");

// table
const studentTable = document.querySelector("[data-student-table]");

// student data
let studentData = JSON.parse(localStorage.getItem("studentData")) || [];

addStudentBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

// form submission
registrationModal.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = registrationModal.querySelector("[data-name]").value;
  const id = registrationModal.querySelector("[data-id]").value;
  const email = registrationModal.querySelector("[data-email]").value;
  const contact = registrationModal.querySelector("[data-contact]").value;

  if (contact.length < 10) {
    alert("Contact number must be 10 digits");
    return;
  }

  const submitBtn = registrationModal.querySelector("[data-submit-btn]");
  const isEditing = submitBtn.dataset.editId !== undefined;

  //   if editing, update the student data
  if (isEditing) {
    // check if there is any Id conflict
    const originalId = submitBtn.dataset.editId;
    if (originalId !== id && studentData.some((std) => (std.id = id))) {
      alert("Student with this ID already exists");
      return;
    }

    // update the student data
    studentData = studentData.map((std) => {
      if (std.id === originalId) {
        return {
          name,
          id,
          email,
          contact,
        };
      }
      return std;
    });

    // reset the submit btn mode
    submitBtn.innerText = "Register";
    delete submitBtn.dataset.editId;
  } else {
    // check if Id already exists
    if (studentData.some((std) => std.id === id)) {
      alert("Student with this ID already exists");
      return;
    }

    const student = {
      name,
      id,
      email,
      contact,
    };

    studentData.push(student);
  }

  saveData();
  registrationModal.querySelector("form").reset();
  closeModal();
  renderStudentData();
});

// modal open/close
function openModal() {
  registrationModal.classList.remove("hidden");
  registrationModal.classList.add("flex");
}

function closeModal() {
  registrationModal.classList.remove("flex");
  registrationModal.classList.add("hidden");
}

// save data to local storage
function saveData() {
  localStorage.setItem("studentData", JSON.stringify(studentData));
}

// render student data in the table
function renderStudentData() {
  if (!studentTable) {
    alert("Table not found");
    return;
  }

  const tbody = studentTable.querySelector("tbody");
  if (tbody) {
    tbody.innerHTML = "";
  }

  //Add student data to the table body
  studentData?.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td class="p-3 text-left">${student.name}</td>
            <td class="p-3 text-left">${student.id}</td>
            <td class="p-3 text-left">${student.email}</td>
            <td class="p-3 text-left">${student.contact}</td>
            <td class="p-3 text-left">
              <button
                data-edit
                data-id="${student.id}"
                class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2 cursor-pointer"
              >
                Edit
              </button>
              <button
                data-delete
                data-id="${student.id}"
                class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded cursor-pointer"
              >
                Delete
              </button>
            </td>`;
    tbody.appendChild(row);
  });

  // Add event listeners to the action buttons
  studentTable.querySelectorAll("[data-edit]").forEach((btn) => {
    btn.addEventListener("click", handleEditStudent);
  });

  studentTable.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", handleDeleteStudent);
  });
}

// function to handle edit student
function handleEditStudent(e) {
  const studentId = e.target.dataset.id;
  const student = studentData.find((std) => std.id === studentId);
  if (student) {
    registrationModal.querySelector("[data-name]").value = student.name;
    registrationModal.querySelector("[data-id]").value = student.id;
    registrationModal.querySelector("[data-email]").value = student.email;
    registrationModal.querySelector("[data-contact]").value = student.contact;
  }
  const submitBtn = registrationModal.querySelector("[data-submit-btn]");
  submitBtn.innerText = "Update";
  submitBtn.dataset.editId = studentId;
  openModal();
}

// function to handle delete student
function handleDeleteStudent(e) {
  const studentId = e.target.dataset.id;
  studentData = studentData.filter((std) => std.id !== studentId);
  saveData();
  renderStudentData();
}

renderStudentData();
