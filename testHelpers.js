import 'babel-polyfill';
export  function mochaAsync(fn) {
    return async function(done) {
        try {
            await fn();
            done();
        } catch (err) {
            done(err);
        }
    };
};
