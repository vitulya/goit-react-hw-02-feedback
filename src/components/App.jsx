import { Component } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';
import { Layout } from './Layout/Layout';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };
  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const { countTotalFeedback } = this;

    return Math.round((good / countTotalFeedback()) * 100) || 0;
  };

  handleClick = event => {
    const { name } = event.target;

    this.setState(prevState => ({ [name]: prevState[name] + 1 }));
  };

  render() {
    const { good, neutral, bad } = this.state;
    const { countTotalFeedback, countPositiveFeedbackPercentage, handleClick } =
      this;
    const total = countTotalFeedback();
    const positivePercentage = countPositiveFeedbackPercentage();
    return (
      <>
        <Layout>
          <Section title="Pleace leave feedback">
            <FeedbackOptions
              options={Object.keys(this.state)}
              onLeaveFeedback={handleClick}
            />
          </Section>
          <Section title="Statistics">
            {good || neutral || bad ? (
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={total}
                positivePercentage={positivePercentage}
              />
            ) : (
              <Notification message="There is no feedback" />
            )}
          </Section>
        </Layout>
      </>
    );
  }
}
