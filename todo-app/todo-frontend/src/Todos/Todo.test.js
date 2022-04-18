import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Todo from './Todo'


test('renders content', () => {
  const dummyTodo = {
    text: 'Write down the goals',
    done: false
  }

  const dummy_doneInfo = () => {
    return <div>doneInfoContent</div>
  };
  const dummy_notDoneInfo = () => {
    return <div>notDoneInfoContent</div>
  };

  const component = render(
    <Todo
      todo={dummyTodo}
      doneInfo={dummy_doneInfo()}
      notDoneInfo = {dummy_notDoneInfo()}
    />
  )

  expect(component.container).toHaveTextContent(
    'Write down the goals'
  );
})
