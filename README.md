# EHRM (Frontend)

## Tech stack
   1. vue.js 4.5.13
   2. npm 6.14.11


## Desciption

EHRM (Electronic human resource management) คือ ระบบการจัดการด้าน hr ให้แก่บริษัท โดยพนักงานสามารถลงบันทึกเวลาเข้างานและออกงานได้ อีกทั้งยังสามารถลางานได้จากระบบอีกด้วย ทำให้ฝายทรัพยากรมนุษย์สามารถตรวจสอบข้อมูลย้อนหลังในการประเมินรายปีได้อีกด้วย

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## Role
### Admin เจ้าหน้าที่ตรวจสอบระบบ
    - สร้าง user ในระบบ
    - ตรวจสอบ logs และ leaves ของ users ทั้งหมด
### Header หัวหน้าแผนก
    - ลงชื่อเข้า / ออก เวลาทำงาน
    - ขอลางาน
    - อนุมัติการลาของพนักงานในแผนก
### User พนักงานทั่วไป
    - ลงชื่อเข้า / ออก เวลาทำงาน
    - ขอลางาน

## user example
```
admin : 

    email : admin@admin.com
    password : password
```
```
header :

    hr department
        email : hr@user.com
        password : password

    sale department
        email : sale@user.com
        password : password

    it department
        email : it@user.com
        password : password
```
```
users : 

    hr department
        email : user1@hr.com
        password : password
        email : user2@hr.com
        password : password
        email : user3@hr.com
        password : password
        
    sale department
        email : user1@sale.com
        password : password
        email : user2@sale.com
        password : password
        email : user3@sale.com
        password : password
    
    it department
        email : user1@it.com
        password : password
        email : user2@it.com
        password : password
        email : user3@it.com
        password : password
```

## backend
https://github.com/nirattasai/ehrm-backend

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
