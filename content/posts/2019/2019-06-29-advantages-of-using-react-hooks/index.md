---
categories:
- javascript
coverImage: screen-shot-2019-06-29-at-5.04.48-pm.png
date: "2019-06-29"
blog: maxrohde.com
tags:
- functional-programming
- programming
- react
- react-hooks
title: Advantages of Using React Hooks
---

I always had the feeling that React is just a bit to complex, a bit to 'heavy' to be a truely elegant solution to the problem of building complex user interfaces in JavaScript. Two issues, for instance, are the general project setup, exemplified by the need to have [create-react-app](https://github.com/facebook/create-react-app), and class-based components, with all their `componentDidMount` and `this` references.

While [React Hooks](https://reactjs.org/docs/hooks-intro.html) are no solution to the first issue, they provide, in my mind, an elegant solution to the second; they provide a better way to do what we used to do with class-based components.

To illustrate this, I will first provide an implementation of a simple component using a class-based component and then refactor this into an implementation using React Hooks.

Here the initial implementation using a class-based component:

```javascript
class User1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId,
      userName: null,
      isLoading: false,
      error: null,
      unmounted: false,
    };
  }

  getUser() {
    this.setState({ isLoading: true, error: null });

    axios
      .get(`https://jsonplaceholder.typicode.com/users/${this.state.userId}`)
      .then((result) => {
        if (this.state.unmounted) {
          return;
        }
        this.setState({
          userName: result.data.name,
          isLoading: false,
        });
      })
      .catch((error) => {
        if (this.state.unmounted) {
          return;
        }

        this.setState({
          error,
          isLoading: false,
        });
      });
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate() {
    // this.getUser();
  }

  componentWillUnmount() {
    this.setState({ unmounted: true });
  }

  render() {
    return (
      <>
        {this.state.isLoading ? <p>Loading ...</p> : <></>}
        {this.state.error ? <p>Cannot load user</p> : <></>}
        {!this.state.isLoading && !this.state.error ? (
          <p>{this.state.userName}</p>
        ) : (
          <></>
        )}
        <button
          onClick={() => {
            const newUserId = this.state.userId + 1;
            this.setState({ userId: newUserId }, this.getUser);
            this.getUser();
          }}
        >
          Next
        </button>
      </>
    );
  }
}
```

As can be seen in above code, this component requests data about a user from [JSONPlaceholder](https://jsonplaceholder.typicode.com) and then display this data. There is also a button that will trigger loading of another user.

Simple enough - but we still need a fair amount of code to handle this scenario in a robust manner, including instances where we start the request for a new user before the previous request has been completed or where a request only completes after the component has been unmounted.

A component with the exact same functionality can be implemented using React Hooks:

```javascript
function User2(props) {
  const [userId, setUserId] = useState(props.userId);
  const [name, setName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      let response;
      try {
        response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
      } catch (e) {
        setIsError(true);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      if (cancelled) return;
      setName(response.data.name);
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return (
    <>
      {isLoading ? <p>Loading ...</p> : <></>}
      {isError ? <p>Cannot load user</p> : <></>}
      {!isLoading && !isError && name ? <p>{name}</p> : <></>}
      <button onClick={() => setUserId(userId + 1)}>Next</button>
    </>
  );
}
```

Here we use `useState` to define a number of state variables and `useEffect` to deal with state updates. `useState` of course is essential in allowing us to define a functional component that also uses state. One major advantage in my mind of the hooks-based approach is that we don't need to worry about using `this` and are in no danger of forgetting it.

`useEffect` replaces the functionality of `componentDidMount` and `componentDidUpdate` in the class-based components. I think it allows reacting to state changes in a much more elegant way. Firstly by linking it to the state of `userId` the `useEffect` handler we have defined will only trigger when the `userId` status has been updated, without us having to add any additional tests and logic around that. Secondly, it elegantly handles both the cases for when the component mounts as well as when the component state changes: by always triggering on component mount, and subsequently on changes to the userId. Thirdly, by returning a function as the result of the `useEffect` handler ...

```javascript
return () => {
  cancelled = true;
};
```

... we have a very easy way to deal with the component unmounting when a request is in flight.

However, the real power of React Hooks, in my mind, lies in the composability of Hooks. The following example implements the features for the component using a custom open source hook: [use-data-api](https://github.com/the-road-to-learn-react/use-data-api):

```javascript
import useDataApi from 'use-data-api';

function User3(props) {
  const [userId, setUserId] = useState(props.userId);
  const [{ data, isLoading, isError }, performFetch] = useDataApi(null, null);

  useEffect(() => {
    performFetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  }, [userId, performFetch]);

  return (
    <>
      {isLoading ? <p>Loading ...</p> : <></>}
      {isError ? <p>Cannot load user</p> : <></>}
      {!isLoading && !isError && data ? <p>{data.name}</p> : <></>}
      <button onClick={() => setUserId(userId + 1)}>Next</button>
    </>
  );
}
```

Above we use the custom hook `useDataApi` that takes care of the details of having to deal with requests to an API ([use-data-api/blob/master/src/index.js](https://github.com/the-road-to-learn-react/use-data-api/blob/master/src/index.js)).

As can be seen, this last example is much shorter in length and easier to understand than the previous examples. Thus showing the biggest advantage for React Hooks - to extract complex behaviour into external functions that can be easily reused within a project and across projects.

To summarise, here all the **advantages** of using React Hooks discussed above:

- Ability to create composite Hooks defining cross-cutting functionality concerns in an application.
- Enables writing functional components with state (no more `this`).
- `useEffect` provides a more concise and elegant way to handle component mount, update and unmount events.

Here the complete source code code of the examples used in this post:

[react-hooks-tutorial](https://github.com/mxro/react-hooks-tutorial)