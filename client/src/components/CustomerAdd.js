import React, {useState} from 'react'
import {post} from 'axios'

export default function CustomerAdd() {
    const initialDataState = {
        file:null,
        name:'',
        birth:'',
        gender:'',
        job:'',
        fileName:''
       
      }

    const [data, setValue] = useState(initialDataState)

    function handleValueChange(e){
        e.preventDefault();

        setValue({
            ...data,
            [e.target.name]:e.target.value
        })
    }

    function handleFileChange(e){
        setValue({
            ...data,
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    function handleFormSubmit(e){
        e.preventDefault();
        console.log(data.name, data.birth, data.job, data.gender);
        addCustomer()
        .then((response)=>{
            console.log(response.data)
        })
        setValue({
            file:null,
            name:'',
            birth:'',
            gender:'',
            job:'',
            fileName:''
    
        })
        window.location.reload()

    }

    function addCustomer(){
        const url = 'api/customers'
        const formData = new FormData()
        formData.append('image', data.file)
        formData.append('name', data.name)
        formData.append('birth', data.birth)
        formData.append('gender', data.gender)
        formData.append('job', data.job)
        const config={
            headers:{
                'content-type':'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }
    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지:<input type='file' name='file' file={data.file} value={data.fileName} onChange={handleFileChange}/><br/>
                이름 : <input type='text' name="name" value={data.name} onChange={handleValueChange}/><br/>
                생년월일 : <input type='text' name="birth" value={data.birth} onChange={handleValueChange}/><br/>
                성별 : <input type='text' name="gender" value={data.gender} onChange={handleValueChange}/><br/>
                직업 : <input type='text' name="job" value={data.job} onChange={handleValueChange}/><br/>
                <button type='submit'>추가하기</button>

            </form>
        </div>
    )
}
