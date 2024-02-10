document.querySelectorAll('.bt-modificar-matriz').forEach(item => {
    item.addEventListener('click', () => {
        abrirCerrar_modificarMatriz()
    })
})
document.querySelector('#bt-mostrar-opciones').addEventListener('click', () => {
    const $SectionDatosMatriz = document.querySelector('#operaciones')
    if ($SectionDatosMatriz.style.display !== 'none') {
        console.log($SectionDatosMatriz.style.display)
        $SectionDatosMatriz.style.display = "none"
    }
    else {
        $SectionDatosMatriz.style.display = "block"
    }
})
document.querySelector('.bt-actualizar-matriz').addEventListener('click',()=>{
let valoresCambiar=document.querySelector('#datos-matriz').value
valoresCambiar=valoresCambiar.replaceAll(/\n+/g,'\n')
valoresCambiar=valoresCambiar.replaceAll(/' '+/g,' ')
valoresCambiar=valoresCambiar.split('\n')
for (let i=0;i<valoresCambiar.length;i++){
    valoresCambiar[i]=valoresCambiar[i].split(' ')
}
matrizDatos=valoresCambiar
abrirCerrar_modificarMatriz()
actualizarMatriz()
})
function abrirCerrar_modificarMatriz() {
    const $SectionDatosMatriz = document.querySelector('#section-datos-matriz')
    if ($SectionDatosMatriz.style.display !== 'none') {
        $SectionDatosMatriz.style.display = "none"
    }
    else {
        $SectionDatosMatriz.style.display = "block"
    }
}
var matrizDatos;

function actualizarMatriz(){
    const $matriz=document.querySelector('#matriz')
    $matriz.innerHTML=""
    let codigoHtml=""
    matrizDatos.forEach(item=>{
        codigoHtml+="<div class='fila-matriz'>"
        item.forEach(valor=>{
            codigoHtml+=`<div class='dato-matriz'>${valor}</div>`
        })
        codigoHtml+='</div>'
    })
    $matriz.innerHTML=codigoHtml
    matrizDatos.unshift(new Array(matrizDatos[0].length).fill(1))
    actualizarResutadoMatriz()
}
function actualizarResutadoMatriz(){
    //[45,77],[46,55],[123,1233]
    let resultado=[]
    let operacionesTexto=[[],[]]
    for(let i=0;i<matrizDatos[0].length;i++){
        let numeroFinal=1
        let indice=i
        for(let j=0;j<matrizDatos.length;j++){
            numeroFinal*=matrizDatos[j][indice]
            indice++
            if(indice>=matrizDatos[0].length){
                indice-=matrizDatos[0].length
            }
        }
        resultado.push(numeroFinal)
    }
    for(let i=0;i<matrizDatos[0].length;i++){
        let numeroFinal=1
        let indice=i
        for(let j=0;j<matrizDatos.length;j++){
            numeroFinal*=matrizDatos[j][indice]
            console.log(matrizDatos[j][indice])
            indice--
            if(indice<0){
                indice=matrizDatos[0].length-1
            }
        }
        resultado.push(-numeroFinal)
    }
    let resultadoFinal=[]
    for(let i=0;i<resultado.length/2;i++){
        resultadoFinal.push(resultado[i]+resultado[i+resultado.length/2])
    }
    actualizarResultadoFinal(resultadoFinal)
    for(let i=0;i<resultado.length;i++){
        if(i<resultado.length/2){
            operacionesTexto[0].push(resultado[i])
        }
        else{
            operacionesTexto[1].push(resultado[i])
        }
    }
    actualizarOperacionesTexto(operacionesTexto)
}
function actualizarResultadoFinal(resultado){
    document.querySelector('#resultado-matriz').innerHTML=`(${resultado.toString()})`
}
function actualizarOperacionesTexto(operaciones){
    document.querySelector('#operaciones').innerHTML=`${operaciones[0].toString().replaceAll(',',' ')}<br>${operaciones[1].toString().replaceAll(',',' ')}`
}