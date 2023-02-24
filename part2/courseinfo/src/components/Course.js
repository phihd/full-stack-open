import React from 'react'

const Header = ({ header_name }) => {
    return (
      <h2>
        {header_name}
      </h2>
    )
  }
  
  const Part = ({ part_name, exercises }) => {
    return (
      <p>
        {part_name} {exercises}
      </p>
    );
  };
  
  const Content = ({ parts }) => {
    return (
      <div>
        {
          parts.map(part => <Part key={part.name} part_name={part.name} exercises={part.exercises} />)
        }
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return <b>total of {total} exercises</b>
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header header_name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course;