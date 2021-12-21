import {all} from 'redux-saga/effects'

function* printName() {
    yield 'redux-saga'
}

export default function* generatorSaga() {
    yield 'xin chao'
    yield all([printName().next().value])
    yield 'Ket thuc'
    return 'Hoc lap trinh redux-saga' //ket thuc => throw -error
}

const result = generatorSaga() //phai gan vao bien khong thi se tao 1 iterator moi
console.log(result.next())
console.log(result.next())
console.log(result.next())
console.log(result.next())