import { HandPalm, Play } from 'phosphor-react'
import * as zod from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CyclesContext } from '../../contexts/CyclesContext'
import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(
    1,
    'O ciclo precisa ser de no mínimo 5 segundos',
  ).max(
    60,
    'O ciclo precisa ser de no máximo 60 segundos',
  ),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export default function Home() {
  const {
    activeCycle,
    createNewCyle,
    interruptCurrentCycle,
  } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form
        action=""
        onSubmit={handleSubmit(createNewCyle)}
      >
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle
          ? (

            <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
              <HandPalm size={24} />
              Interromper
            </StopCountdownButton>
            )
          : (

            <StartCountdownButton
              type="submit"
              disabled={isSubmitDisabled}
            >
              <Play size={24} />
              Começar
            </StartCountdownButton>
            )}
      </form>
    </HomeContainer>
  )
}
