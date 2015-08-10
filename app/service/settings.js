'use strict';

var settings = {
    location: {
        login: '/api/login',
        role: {
            all: '/api/role/all'
        },
        user: {
            save: '/api/user/save'
        }
    },
    validation: {
        emailRegex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i,
        phoneRegex: /^[-\d\s()+]{8,}$/,
        nameRegex: /^[a-zA-Z0-9`~@#%^ &*()-_=+\[\]{}\\|;:',.<>\/?.]*$/,
        passwordRegex: /^[a-zA-Z0-9`~@#%^ &*()-_=+\[\]{}\\|;:',.<>\/?.]*$/
    }
};
