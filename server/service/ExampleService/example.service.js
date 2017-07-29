class ExampleService {
  constructor(something) {
    this.something = something;
  }

  getSomething() {
    return () => this.something;
  }
}

module.exports = ExampleService;
