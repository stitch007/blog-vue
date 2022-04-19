export function starry(canvas, stop) {
  let width = window.innerWidth
  let height = window.innerHeight
  let cometFlag = true

  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)
  const context = canvas.getContext('2d')
  const instances = []

  function range(left, right) {
    return Math.random() * (right - left) + left
  }

  function Particle() {
    this.reset = function() {
      this.giant = Math.random() < 0.03
      this.comet = !this.giant && !cometFlag && Math.random() < 0.1
      this.x = range(0, width - 10)
      this.y = range(0, height)
      this.r = range(1.1, 2.6)
      this.dx = range(0.05, 0.3) + (this.comet + 1 - 1) * 0.05 * range(50, 120) + 0.1
      this.dy = -range(0.05, 0.3) - (this.comet + 1 - 1) * 0.05 * range(50, 120)
      this.fadingOut = null
      this.fadingIn = true
      this.opacity = 0
      this.opacityTresh = range(0.2, 1 - 0.4 * (this.comet + 1 - 1))
      this.do = range(0.0005, 0.002) + 0.001 * (this.comet + 1 - 1)
    }

    this.fadeIn = function() {
      if (this.fadingIn) {
        this.fadingIn = this.opacity < this.opacityTresh
        this.opacity += this.do
      }
    }

    this.fadeOut = function() {
      if (this.fadingOut) {
        this.fadingOut = this.opacity > 0
        this.opacity -= this.do / 2
        if (this.x > width || this.y < 0) {
          this.fadingOut = false
          this.reset()
        }
      }
    }

    this.draw = function() {
      context.beginPath()
      if (this.giant) {
        context.fillStyle = `rgba(180,184,240,${this.opacity})`
        context.arc(this.x, this.y, 2, 0, 2 * Math.PI, false)
      } else if (this.comet) {
        context.fillStyle = `rgba(226,225,224,${this.opacity})`
        context.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false)
        for (let i = 0; i < 30; i++) {
          context.fillStyle = `rgba(226,225,224,${(this.opacity - this.opacity / 20 * i)})`
          context.rect(this.x - this.dx / 4 * i, this.y - this.dy / 4 * i - 2, 2, 2)
          context.fill()
        }
      } else {
        context.fillStyle = `rgba(226,225,142,${this.opacity})`
        context.rect(this.x, this.y, this.r, this.r)
      }
      context.closePath()
      context.fill()
    }

    this.move = function() {
      this.x += this.dx
      this.y += this.dy
      if (this.fadingOut === false) {
        this.reset()
      }
      if (this.x > width * 0.75 || this.y < 0) {
        this.fadingOut = true
      }
    }
  }

  function drawAll() {
    context.clearRect(0, 0, width, height)
    instances.forEach((instance) => {
      instance.move()
      instance.fadeIn()
      instance.fadeOut()
      instance.draw()
    })
  }

  function resize() {
    width = window.innerWidth
    height = window.innerHeight
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
  }

  window.removeEventListener('resize', resize)

  for (let i = 0; i < Math.floor(0.128 * width); i++) {
    instances[i] = new Particle()
    instances[i].reset()
  }

  setTimeout(() => {
    cometFlag = false
  }, 50)

  ;(function func() {
    !stop() && drawAll()
    window.requestAnimationFrame(func)
  })()
}
