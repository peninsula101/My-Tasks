import {Component} from 'react'
import {v4} from 'uuid'
import {
  MainBgContainer,
  CreateBgTaskContainer,
  CreateForm,
  FormHead,
  InputLabel,
  Label,
  Input,
  SelectInput,
  OptionInput,
  FormBtn,
  TaskListViewDiv,
  TaskListViewDivTitle,
  UnOrderedTagList,
  TagsList,
  TagBtn,
  TasksList,
  EmptyTaskText,
  TaskListItems,
  TaskText,
  TaskTag,
} from './styledComponents'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    inputText: '',
    inputTag: tagsList[0].optionId,
    activeTag: 'INITIAL',
    taskList: [],
  }

  submitForm = event => {
    event.preventDefault()
    const {inputText, inputTag} = this.state
    const newTask = {
      id: v4(),
      task: inputText,
      tag: inputTag,
    }
    if (inputText.length !== 0) {
      this.setState(prevState => ({
        taskList: [...prevState.taskList, newTask],
        inputText: '',
        inputTag: '',
      }))
    }
  }

  changeInput = event => {
    this.setState({inputText: event.target.value})
  }

  onChangeTag = event => {
    this.setState({inputTag: event.target.value})
  }

  onClickActiveTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  renderCreateTaskView = () => {
    const {inputText, inputTag} = this.state

    return (
      <CreateBgTaskContainer>
        <CreateForm onSubmit={this.submitForm}>
          <FormHead>Create a task</FormHead>
          <InputLabel>
            <Label htmlFor="inputText">Task</Label>
            <Input
              id="inputText"
              type="text"
              placeholder="Enter the task here"
              onChange={this.changeInput}
              value={inputText}
            />
          </InputLabel>
          <InputLabel>
            <Label htmlFor="selectTag">Tags</Label>
            <SelectInput
              onChange={this.onChangeTag}
              value={inputTag}
              id="selectTag"
            >
              {tagsList.map(eachTag => (
                <OptionInput value={eachTag.optionId} key={eachTag.displayText}>
                  {eachTag.displayText}
                </OptionInput>
              ))}
            </SelectInput>
          </InputLabel>
          <FormBtn type="submit">Add Task</FormBtn>
        </CreateForm>
      </CreateBgTaskContainer>
    )
  }

  renderTaskListView = () => {
    const {taskList, activeTag} = this.state

    return (
      <TaskListViewDiv>
        <TaskListViewDivTitle>Tags</TaskListViewDivTitle>
        <UnOrderedTagList>
          {tagsList.map(eachTag => {
            const isActive = activeTag === eachTag.optionId
            return (
              <TagsList key={eachTag.optionId}>
                <TagBtn
                  type="button"
                  value={eachTag.optionId}
                  onClick={this.onClickActiveTag}
                  isActive={isActive}
                >
                  {eachTag.displayText}
                </TagBtn>
              </TagsList>
            )
          })}
        </UnOrderedTagList>
        <TaskListViewDivTitle>Tasks</TaskListViewDivTitle>
        <TasksList>
          {taskList.length === 0 ? (
            <EmptyTaskText>No Tasks Added Yet</EmptyTaskText>
          ) : (
            this.renderTaskCard()
          )}
        </TasksList>
      </TaskListViewDiv>
    )
  }

  renderTaskCard = () => {
    const {taskList, activeTag} = this.state
    const filteredTaskList =
      activeTag === 'INITIAL'
        ? taskList
        : taskList.filter(each => each.tag === activeTag)

    return (
      <>
        {filteredTaskList.map(each => (
          <TaskListItems key={each.id}>
            <TaskText>{each.task}</TaskText>
            <TaskTag>{each.tag}</TaskTag>
          </TaskListItems>
        ))}
      </>
    )
  }

  render() {
    return (
      <MainBgContainer>
        {this.renderCreateTaskView()}
        {this.renderTaskListView()}
      </MainBgContainer>
    )
  }
}

export default MyTasks
