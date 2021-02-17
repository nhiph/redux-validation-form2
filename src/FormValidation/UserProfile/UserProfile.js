import React, { Component } from 'react';
import './UserProfile.css';
import Swal from 'sweetalert2';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Quan sát các trg dữ liệu thay đổi gồm các fields, các câu thông báo lỗi bên dưới fields, 
            // cần lưu values thay đổi của fields + errors thay đổi của fields trong state
            values: {
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                password: '',
                passwordConfirm: ''
            },
            errors: {
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                password: '',
                passwordConfirm: ''
            }
            
        }
    }
    
    onChange = (event) => {
        let {name, value, type} = event.target;

        // setState la phương thức bất đồng bộ, không đc để 2 hàm bất đồng bộ setState 
        // cho values và erros cùng lúc, khi đang set giá trị value chưa xong, errors xong rồi đè thông báo lỗi lên
        //  gây sai mục đích, không khuyến khích gọi 2 hàm setState liên tục 
        // Đặt biến cho nó xử lý bên ngoài, setState lại 1 ham có 2 biến

        let newValues = {...this.state.values, [name]: value};
        let newErrors = {...this.state.errors};

        //Kiểm tra rỗng
        if(value.trim()===''){
            newErrors[name] = name + ' is required !'
        }else{
            newErrors[name] = '';
        }
        // Kiểm tra email
        if(type==='email'){
            const regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
            if(!regexEmail.test(value)){ //kiểm tra không hợp lệ
                newErrors[name] = name + ' is invalid !';
            }else{               // Kiểm tra hợp lệ
                newErrors[name] = '';
            }
        }
        
        //Kiểm tra password
        if(name==='passwordConfirm'){
            if(value === newValues['password']){
                newErrors[name] = '';
            }else{
                newErrors[name] = name + ' is invalid !';
            }
        }
        // setState lại giá trị sau thay đổi
        this.setState({
            values: newValues,
            errors: newErrors
        });
    }

    onSubmit = (event) =>{
        //Ngan reload trang
        event.preventDefault();
        // Xet ĐK submit: Lỗi rỗng (k có lỗi) và values phải có giá trị, cần quét state qua values + errors để check 
        let {values, errors} = this.state;
        // Quét qua thuộc tính của object dùng for in
        // Quét qua phần tử của mảng dùng for of

        let valid=true; // Biến xác định form hợp lệ
        let profileContent= '';
        let errorsContent= '';

        for(let key in values){
            if(values[key]===''){
                valid=false;
            }

            profileContent += `<p class="text-left"><b>${key}:</b> ${values[key]}</p>`
        }

        for(let key in errors){
            if(errors[key] !== ''){
                errorsContent += `<p class="text-left"><b class="text-danger">${key} is invalid !</b></p>`
                valid=false;
            }
        }

        // Kiểm tra valid
        if(!valid){
            Swal.fire({
                icon: 'error', //note: các dạng thông dung: success, error, warning, question
                title: 'Your Profile',
                html: errorsContent,
                confirmButtonText: 'OK'
              })
            return;
        }else{
            Swal.fire({
                icon: 'success', //note: các dạng thông dung: success, error, warning, question
                title: 'Your Profile',
                html: profileContent,
                confirmButtonText: 'OK'
              })
        }
    }

    render() {
        return (
            <div className="container-fluid" style={{ backgroundColor: '#EEEEEE', display: 'flex', justifyContent: 'center' }} >
                <form onSubmit={this.onSubmit} className="w-50 bg-white p-5 m-5">
                    <h1 className="text-center">User Profile</h1>
                    <div className="row">
                        <div className="col-6">
                            <div className="group">
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    required
                                    value={this.state.values.firstName}
                                    onChange={this.onChange}>
                                </input>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>firstName</label>
                                <span className="text text-danger">{this.state.errors.firstName}</span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="group">
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    required
                                    value={this.state.values.lastName}
                                    onChange={this.onChange}>
                                </input>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>lastName</label>
                                <span className="text text-danger">{this.state.errors.lastName}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="group">
                                <input 
                                    type="text" 
                                    name="userName" 
                                    required
                                    value={this.state.values.userName}
                                    onChange={this.onChange}>
                                </input>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>userName</label>
                                <span className="text text-danger">{this.state.errors.userName}</span>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="group">
                                <input 
                                    type="email" 
                                    name="email" 
                                    required
                                    value={this.state.values.email}
                                    onChange={this.onChange}>
                                </input>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>email</label>
                                <span className="text text-danger">{this.state.errors.email}</span>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="group">
                                <input 
                                    type="password" 
                                    name="password" 
                                    required
                                    value={this.state.values.password}
                                    onChange={this.onChange}>
                                </input>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>password</label>
                                <span className="text text-danger">{this.state.errors.password}</span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="group">
                                <input 
                                    type="password" 
                                    name="passwordConfirm" 
                                    required
                                    value={this.state.values.passwordConfirm}
                                    onChange={this.onChange}>
                                </input>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>passwordConfirm</label>
                                <span className="text text-danger">{this.state.errors.passwordConfirm}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn text-white bg-dark w-100 col-12" type="submit" style={{fontSize: '25px'}}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
