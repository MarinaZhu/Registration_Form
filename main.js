const form =document.querySelector('form'),
      form1 = document.querySelector('.form.first'),
      form2 = document.querySelector('.form.second'),
      nextBtn = document.querySelector('.nextBtn'),
      backBtn = document.querySelector('.backBtn'),
      firstFields = document.querySelectorAll('.first input, .first select'),
      mobileNumber = document.querySelector('#phone'),
      email = document.querySelector('#email'),
      gender = document.querySelector('#gender');

function validateForm() {
    let isValid = true;
    // Loop through all elements in firstFields
    firstFields.forEach(elem => {
        const isValidInput = elem.nodeName === 'INPUT' && elem.value.trim() !== '';
        const isValidSelect = elem.nodeName === 'SELECT' && elem.selectedIndex !== 0;

        if (!isValidInput && !isValidSelect) {
            // Apply the error class to the element
            elem.classList.add('error');
            isValid = false;
        } else {
            // Remove the error class if it was previously applied
            elem.classList.remove('error');
        }
    });

    // Validate email
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!emailPattern.test(email.value.trim())) {
        email.classList.add("error");
        isValid = false;
    } else {
        email.classList.remove("error");
    }

    // Validate mobile number
    const mobileNumberRegex = /^[\d,\s,\+,\-]{5,20}/;
    if (!mobileNumberRegex.test(mobileNumber.value.trim())) {
        mobileNumber.classList.add('error');
        isValid = false;
    } else {
        mobileNumber.classList.remove('error');
    }

    return isValid;
}

nextBtn.addEventListener('click', (e) => {
    if (!validateForm()) {
        e.preventDefault();
    }else{
        form1.style.display = 'none';
        form2.style.display = 'block';
    }
    // let findEmpty = Array.from(firstFields).find((element)=>{
    //     if(element.value.length < 1){return true}
    //     return false
    // });
    // console.log("&& " + (!findEmpty && !mobileNumber.classList.contains('error')));
    //
    // if(!findEmpty && !mobileNumber.classList.contains('error')){
    //     form.classList.add('setActive');
    // }else {
    //     form.classList.remove('setActive');
    // }
});

backBtn.addEventListener('click', () => {
    form1.style.display = 'block';
    form2.style.display = 'none';
});

const postData = async (url, data) =>{
    const res = await fetch(url, {method: "POST",
        headers: {
            'Content-type' : 'application/json'
        },
        body: data
    });

    return await res.json();
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    postData('http://localhost:3000/usersData', json)
        .then(data => {
            console.log(data);
        }).catch(() => {
            onsole.log('error');
    }).finally(() => {
        form.reset();
    });
});
