import React from 'react';

const marqueeStyle = {
    whiteSpace: 'nowrap',
    display: 'block',
    position: 'relative',
    overflowX: 'hidden'
};

const defautOption = {
    gapWidth: 20,
    speed: 30,
    delay: 200
};

const maxSpeed = 250;
const widthWatcherInterval = 100;
const debounceDelay = 1000;

export default class extends React.PureComponent{
    componentDidUpdate() {
        this.startAnimationTimer();
    }

    componentDidMount() {
        this.startWidthWatcher()
        this.startAnimationTimer();
    }

    componentWillUnmount() {
        this.clearTimer();
        this.stopWidthWatcher();
    }

    validateChildren(children = '') {
        if (typeof children === 'string' ||
            typeof children === 'number' ||
            typeof children === 'boolean'
        ) {
            return;
        }
        throw new Error("The children of MarqueeText must be a text.");
    }

    render() {
        this.clearTimer();
        let { props: { children, className } } = this;
        this.validateChildren(children);
        return (
            <p className={className} ref="container" style={marqueeStyle}>
                <span ref="txt">{children}</span>
                <span ref="tail"></span>
            </p>
        );
    }

    getOptionFromProps() {
        let { gapWidth, speed, delay } = this.props;
        speed = parseInt(speed) || defautOption.speed;

        return {
            delay: parseInt(delay) || defautOption.delay,
            speed: speed > maxSpeed? maxSpeed: speed,
            gapWidth: parseInt(gapWidth) || defautOption.gapWidth
        }
    }

    _resetText() {
        let { txt, tail } = this.refs;
        tail.removeAttribute('style');
        txt.removeAttribute('style');
        txt.style.display = 'inline-block';
        txt._currentPosition = 0;
        tail._currentPosition = 0;
        tail.innerHTML = '';
        tail.style.display = 'none';
    }

    startAnimationTimer() {
        this._resetText();
        let { container, txt, tail } = this.refs;
        let containerWidth = container.getBoundingClientRect().width;
        let { width: txtWidth, height: txtHeight } = txt.getBoundingClientRect();
        container._width = containerWidth;
        container.style.height = '';

        if (txtWidth <= containerWidth) {
            return;
        }
        container.style.height = txtHeight;

        txt.style.position = 'absolute';
        tail.style.position = 'absolute';
        tail.style.display = 'inline-block';
        tail.innerHTML = this.props.children;

        let { gapWidth, speed, delay } = this.getOptionFromProps();
        let initPosition = txtWidth + gapWidth;
        this._moveLeft(tail, -initPosition);

        this.starterTimer = setTimeout(() => {
            this.animationTimer = setInterval(() => {
                this.textAnimate(txt, tail, initPosition, speed);
            }, 1000 / 60);
        }, delay);
    }

    _setTranslateX(element, x) {
        element.style.transform = `translate(${x}px, 0px)`;
        element._currentPosition = x;
    }

    _moveLeft(element, offset) {
        let position = parseFloat(element._currentPosition || 0);
        let newPosition = position - offset;
        this._setTranslateX(element, newPosition);
        element._currentPosition = newPosition;

        return newPosition;
    }

    textAnimate(txt, tail, initialPosition, speed) {
        let step = speed / 60;
        if (!txt || !tail) {
            return
        }

        let oldTxtPosition = txt._currentPosition || 0,
            oldTailPosition = tail._currentPosition || 0,
            newTxtPosition = this._moveLeft(txt, step),
            newTailPosition = this._moveLeft(tail, step);

        if (oldTxtPosition > 0 && newTxtPosition <= 0) {
            this._setTranslateX(tail, initialPosition);
        }

        if (oldTailPosition > 0 && newTailPosition <= 0) {
            this._setTranslateX(txt, initialPosition);
        }
    }

    clearTimer() {
        if (this.animationTimer) {
            clearInterval(this.animationTimer);
            this.animationTimer = null;
        }
        if (this.starterTimer) {
            clearTimeout(this.starterTimer);
            this.starterTimer = null;
        }
    }

    startWidthWatcher() {
        this._lastWidthChange = new Date().getTime();
        if (!this._widthWatcherTimer) {
            this._widthWatcherTimer = setInterval(() => {
                let { container } = this.refs;
                let { _width } = container;
                let containerWidth = container.getBoundingClientRect().width;
                if (typeof _width === 'undefined') {
                    container._width = containerWidth;
                    return;
                }

                let currentTime = new Date().getTime();
                if (_width !== containerWidth) {
                    this.clearTimer();
                    this._resetText();
                    if ((currentTime - this._lastWidthChange) >= debounceDelay) {
                        this.startAnimationTimer();
                        this._lastWidthChange = currentTime;
                        container._width = containerWidth;
                    }
                }
            }, widthWatcherInterval);
        }
    }

    stopWidthWatcher() {
        if (this._widthWatcherTimer) {
            clearInterval(this._widthWatcherTimer);
        }
    }
}
