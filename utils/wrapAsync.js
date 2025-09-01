//utils mtlb extra chije yha hungi such as error handling k liye wrapAsync class

module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}