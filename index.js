window.onload = () => {
  document.querySelector('.carousel__arrow--right').addEventListener('click', clickRight)
  document.querySelector('.carousel__arrow--left').addEventListener('click', clickLeft)
  document.querySelector('.form__button').addEventListener('click', validateForm)
  document.querySelectorAll('.project__button').forEach((element) => {
    element.addEventListener('click', (e) => openModal(e))
  })
  document.body.addEventListener('click', (e) => closeModal(e))
  document.body.addEventListener('keydown', (e) => keyboardCloseModal(e))
}

/** Esta funcion se llama cuando la persona hace click en la fecha derecha del carousel para navegar a la derecha */
function clickRight() {
  const currentLeft = parseInt(getComputedStyle(document.querySelector('.projects__viewport')).left, 10)
  if (currentLeft < -270) {
    //si el valor de izquierda es menor a -270, para de mover el contenido
    return
  }
  let newValue = currentLeft - 270 //270 toma en cuenta el tamaño de la imagen mas sus margines
  document.querySelector('.projects__viewport').style.left = `${newValue}px`
  switch (newValue) {
    case -270:
      document.querySelector('.aria__project--button1').setAttribute('tabindex', '-1')
      document.querySelector('.aria__project--container1').setAttribute('aria-hidden', 'true')
      document.querySelector('.aria__project--button4').removeAttribute('tabindex')
      document.querySelector('.aria__project--container4').removeAttribute('aria-hidden')
      break
    case -540:
      document.querySelector('.aria__project--button2').setAttribute('tabindex', '-1')
      document.querySelector('.aria__project--container2').setAttribute('aria-hidden', 'true')
      document.querySelector('.aria__project--button5').removeAttribute('tabindex')
      document.querySelector('.aria__project--container5').removeAttribute('aria-hidden')
      break
    default:
      break
  }
}

/** Esta funcion se llama cuando la persona hace click en la fecha izquierda del carousel para navegar a la izquierda */
function clickLeft() {
  const currentLeft = parseInt(getComputedStyle(document.querySelector('.projects__viewport')).left, 10)
  if (currentLeft === 0) {
    //si el valor de izquiera es 0, retornar para no seguir movierno el contenido
    return
  }
  let newValue = currentLeft + 270
  document.querySelector('.projects__viewport').style.left = `${newValue}px`
  switch (newValue) {
    case -270:
      document.querySelector('.aria__project--button2').removeAttribute('tabindex')
      document.querySelector('.aria__project--container2').removeAttribute('aria-hidden')
      document.querySelector('.aria__project--button5').setAttribute('tabindex', '-1')
      document.querySelector('.aria__project--container5').setAttribute('aria-hidden', 'true')
      break
    case 0:
      document.querySelector('.aria__project--button1').removeAttribute('tabindex')
      document.querySelector('.aria__project--container1').removeAttribute('aria-hidden')
      document.querySelector('.aria__project--button4').setAttribute('tabindex', '-1')
      document.querySelector('.aria__project--container4').setAttribute('aria-hidden', 'true')
      break
    default:
      break
  }
}

function validateForm(e) {
  e.preventDefault()
  const inputs = document.querySelectorAll('.form__input')
  let isValid = true
  for (const input of inputs) {
    if (!input.value) {
      const error = input.nextElementSibling
      error.style.display = 'inline'
      isValid = false
    } else {
      const noError = input.nextElementSibling
      noError.style.display = 'none'
    }
  }
  if (!isValid) return
  showNotification()
}

/** Esta funcion se llama cuando la persona hace click en el boton de enviar del formulario de contacto */
function showNotification() {
  document.querySelector('.notification').style.display = 'flex'
  document.querySelector('.notification').innerHTML = 'Mensaje enviado con exito!'
  setTimeout(function () {
    document.querySelector('.notification').style.display = 'none'
  }, 3000)
}

/** Esta funcion se llama cuando la persona hace click en cualquier porjecto del carousel */
function openModal(e) {
  document.querySelector('.modal-mask').style.display = 'flex'
  document.querySelector('.modal__caption').focus()
  e.stopPropagation()
}

/** Esta funcion se llama para cerrar el modal */
function closeModal(e) {
  // si el click occurio dentro del las imagenes del carousel o dentro del modal, no se cierra el modal
  const modal = document.querySelector('.modal')
  if (!modal.contains(e.target) || e.target.classList.contains('modal__button')) {
    document.querySelector('.modal-mask').style.display = 'none'
  }
}

/** Esta funcion se llama para cerrar el modal con la tecla ESC */
function keyboardCloseModal(e) {
  if (e.key === 'Escape') {
    document.querySelector('.modal-mask').style.display = 'none'
  }
}
