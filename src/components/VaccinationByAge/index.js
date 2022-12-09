import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {vaccinationAgeDetails} = props

  return (
    <div className="age-container">
      <h1 className="age-heading">Vaccination by age</h1>
      <PieChart width={450} height={350} margin={{top: 50, left: 100}}>
        <Pie
          cx="70%"
          cy="40%"
          data={vaccinationAgeDetails}
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#5a8dee" />
          <Cell name="44-60" fill="  #a3df9f" />
          <Cell name="Above 60" fill=" #64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontSize: 15, fontFamily: 'Roboto', marginLeft: 80}}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
