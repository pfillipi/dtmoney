import React, { useContext } from 'react';
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { TransactionsContext } from '../../TransactionsContext';

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraws += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0,
  })

  return (
    <Container>
      <div>
        <header>
          <p>Inntekt</p>
          <img src={incomeImg} alt="Income" />
        </header>
        <strong>
          {new Intl.NumberFormat('nb-NO', {
            style: 'currency',
            currency: 'NOK'
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Resultat</p>
          <img src={outcomeImg} alt="Outcome" />
        </header>
        <strong>
          -
          {new Intl.NumberFormat('nb-NO', {
          style: 'currency',
          currency: 'NOK'
        }).format(summary.withdraws)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('nb-NO', {
            style: 'currency',
            currency: 'NOK'
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}