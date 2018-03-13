import React, { Component } from "react";

function Denomination(props) {
  return (
    <div className="col-3">
      <div className="card well bg-light text-center p-2">
        <h4>{props.amount}</h4>
        <p className="display-5 lead">{props.number}</p>
      </div>
    </div>
  );
}

var aCoins = [
  { coin: "twenties", value: 20 },
  { coin: "tens", value: 10 },
  { coin: "fives", value: 5 },
  { coin: "ones", value: 1 },
  { coin: "quarters", value: 0.25 },
  { coin: "dimes", value: 0.1 },
  { coin: "nickels", value: 0.05 },
  { coin: "pennies" }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Change Calculator",
      due: "",
      received: "",
      difference: "",
      twenties: 0,
      tens: 0,
      fives: 0,
      ones: 0,
      quarters: 0,
      dimes: 0,
      nickels: 0,
      pennies: 0
    };

    this.handleDue = this.handleDue.bind(this);
    this.handleReceived = this.handleReceived.bind(this);
    this.calculateChange = this.calculateChange.bind(this);
  }

  renderDenomination(amount, number) {
    return <Denomination amount={amount} number={number} />;
  }

  handleDue(e) {
    this.setState({ due: e.target.value });
  }

  handleReceived(e) {
    this.setState({ received: e.target.value });
  }

  calculateChange() {
    const amountDue = this.state.due;
    const amountReceived = this.state.received;

    let amountRemaining = amountReceived - amountDue;

    this.setState({ difference: amountRemaining });

    const updateViews = [];

    aCoins.forEach(function(i) {
      let output;
      let denom;
      if (i.value) {
        output = (amountRemaining - amountRemaining % i.value) / i.value;
        denom = i.value;
        updateViews.push(output);
      } else {
        output = amountRemaining.toFixed(2) * 100;
        updateViews.push(output);
      }
      amountRemaining %= i.value;
    });

    this.setState({ twenties: updateViews[0] });
    this.setState({ tens: updateViews[1] });
    this.setState({ fives: updateViews[2] });
    this.setState({ ones: updateViews[3] });
    this.setState({ quarters: updateViews[4] });
    this.setState({ dimes: updateViews[5] });
    this.setState({ nickels: updateViews[6] });
    this.setState({ pennies: updateViews[7] });
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-white mt-4 mb-4">{this.state.title}</h1>
        <hr className="bg-light" />
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-header text-left">Enter Information</div>

              <div className="card-body p-3">
                <label htmlFor="how-much-due">
                  <strong>How much is due?</strong>
                </label>
                <input
                  className="form-control"
                  id="how-much-due"
                  name="amountDue"
                  type="text"
                  value={this.state.due}
                  placeholder="Enter amount due..."
                  onChange={this.handleDue}
                />

                <label htmlFor="how-much-received">
                  <strong>How much was received?</strong>
                </label>
                <input
                  className="form-control"
                  id="how-much-received"
                  name="amountReceived"
                  type="text"
                  value={this.state.received}
                  placeholder="Enter amount received..."
                  onChange={this.handleReceived}
                />
              </div>

              <div className="card-footer">
                <button type="submit" className="btn btn-primary w-100" onClick={this.calculateChange}>
                  Calculate
                </button>
              </div>
            </div>
          </div>

          <div className="col-8">
            <div className="card">
              <div className="card-body">
                <div className="card alert alert-success bg-success text-white text-center p-3">
                  <strong>The total change due is ${this.state.difference}</strong>
                </div>
                <div className="container">
                  <div className="row mt-4 mb-4">
                    {this.renderDenomination("Twenty", this.state.twenties)}
                    {this.renderDenomination("Ten", this.state.tens)}
                    {this.renderDenomination("Five", this.state.fives)}
                    {this.renderDenomination("Ones", this.state.ones)}
                  </div>
                  <div className="row">
                    {this.renderDenomination("Quarters", this.state.quarters)}
                    {this.renderDenomination("Dimes", this.state.dimes)}
                    {this.renderDenomination("Nickels", this.state.nickels)}
                    {this.renderDenomination("Pennies", this.state.pennies)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
