input.onButtonPressed(Button.A, function () {
    RocketLink.armStatusLys(true)
    RocketLink.linkStatusLys(true)
})
input.onButtonPressed(Button.B, function () {
    RocketLink.armStatusLys(false)
    RocketLink.linkStatusLys(false)
})
