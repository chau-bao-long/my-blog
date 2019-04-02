---
title: Did you write Android app in RxJava way? If not, give it a shot!
date: "2017-03-28T18:12:03.284Z"
cover: cover-android-with-rxjava.png
categories: "TECHNOLOGY / ANDROID"
---

RxJava isn't something new in Android. RxJava came and changed how we code because of its great benefits. I do believe that whole of Android developers have to deal too much with stuffs like callback, switch thread, handle error, cancel process,... instead of focus on app business, developers waste so many time on repeatly things to adapt with Android framework. I still remember the days before RxJava, we jump to background through AsyncTask do to a network call while UI keeps the callback to get ready for any network response. Ussually, Many APIs get called at same time, some of them get errors, some of them success, the Callback tend to heavy and our Activity just looks like a mess. And you know, Multithread along with share data between thread is the things that make Android developer life become harder, most of crashes happen here, unexpected result comes out with no good explaination. And even debug now is a challenge, because you know, breakpoint would stop a thread while the others still running and It's easy drive them crazy. So, that's the reason why RxJava show up and save developer life.

First of all, you guys may curious about what does "Rx" in RxJava means and why people name it like that. Rx is "reactive", reactive programming style is like sitting among different things and react to the changing of data. 
    - Network responses. Yay! our code know it, get response data, parse data, process data, update to UI. 
    - User click a button , our code catch the event, do an action to react to that event.
    - Go to a screen, fetch data from database,  our code already there to handle each of data return from the query.
    - Broadcast Receive fires, Service notify to Activity, and many things else come from Framework, our code have to ready for all of them. 
So, basically, when you are an Android developer, you are forced to think in Reactive way. Nothing in Android world is imperative. It's not like pure Java, where you have a main function to run lines of code one by one until the end. Android is like a looper, it runs infinitely until user close app. Anything is reactive, your mission is satisfy users by handle anything for them without let app crash or go wrong. We are talking 2 concepts: Reactive and Imperative. Let I show code to clarify where the difference is:

```java
interface UserManager {
    User getUser();
    void setName(String name); 
    void setAge(int age); 
}
UserManager um = new UserManager();
um.setName("Trump");
um.setAge(70);
print um.getUser();
```

Above code is wrote in imperactive way: create an object, set name, set age, print the object. But what if setName doesn't return immediately, it takes a time to process. So, when we print the object, the name still up in the air and object is printed without that name. Reactive way would solve this problem. 

```java
um.setName("Trump", new UserManager.Listener() {
    public void success() {
        print um.getUser();

        um.setAge(70, new UserManager.Listener() {
            print um.getUser();
        })
    }
})
```
It better now but looks more complicated and ugly to me. Imagine that you apply it in Android

```java
public class UserActivity extends Activity {
    private final UserManager um = new UserManager();

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.blahblahblah);
        TextView tv  = (TextView) findViewById(R.id.user_name);
        tv.setText(um.getUser().toString());
        um.setName("Trump", new UserManager.Listener() {
            public void success() {
                runOnUiThread(new Runnable() {
                    public void run() {
                        if (isDestroyed()) {
                            tv.setText(um.getUser().toString());
                        }
                    }
                });
            }

            public void fail() {
                // try again
            }
        });
    }
}
```
Ops, from a freaking simple setName at first, now it turns to kinda unclearable code, too much boring things. Write a callback with success/error. setName with callback, if success then we `runOnUiThread`, in case of fail we gonna retry. Don't forget our App can disappear at any time by user. So, another extra step is check whether the Activity `isDestroyed()` or your App should be crashed. From there, RxJava helps you avoid above boilerplate code, make our code more concise and simple, you gonna have chance to totally focus on business logic and release better App. That's meaning of RxJava. 

In next section, I will take a time to discover what is behind the power of RxJava. If you are looking for a place to get start, go directly to [RxJava Wiki](https://github.com/ReactiveX/RxJava/wiki) as a Comprehensive Place, where you should find anything you need: setup, run a demo, sample, documentation, way to deal with problem, etc. To developers who already are familar with RxJava, keep reading! This topic is for you. You will find out nothing is magic and how RxJava works in the end. 

I'll try to make it as simple as I can. Before understanding RxJava, we should look back on ObserverPattern because RxJava is built on it. I'll give you some pure Java code

```java

class Observable {
    private List<Observer> mObserver;
    
    public void subscribe(Observer obs) {
        mObserver.add(obs);
    }
    
    public void notifyObservers() {
            for (Observer obs : mObserver) {
                obs.notify();
            }
        }
    }
}

class Observer {
    public void notify() {
        // do some stuffs
    }
    
    public void update(Observable obj, Object arg) {
          // should be overrided
    }
}

...

public class MyApp {
    public static void main(String[] args) {
        Observable observable = new Observable();

        observable.subscribe(new Observer() {
            public void update(Observable obj, Object arg) {
                System.out.println("Received response: " + arg);
            }
        });
            
    }
}

```

Main of concepts in RxJava is Observable and Observer. Many Observers can subscribe to a Observable so that whenever Observable notify, all of Observer are received the signal. In Android, Observer can be Activity which subscribe to a Network request, and when Network response, Activity is received the signal as data and update data to UI. Or Observer can be a Fragment that subscribe to a Button, when user click that button, Fragment can be received the event and execute some action on it. We can imagine the data as a stream in RxJava, where Android components can subscribe on that stream to receive data. With incoming data , we may want to process that data a little bit before show it on UI. This processing is called Operator. RxJava also bring multiple interface of observable. Each observable need a diferrent to subscribe. Depend on what you need, you can pick one that suitable for particular case. They are: Flowable, Observable, Single, Completable, Maybe. 
    - Subscribe to Flowable by Subscriber. Flowable is a data stream with BackPressure (backpressure we will discuss later). Whenever data emit an item, onNext get called. In case of failure, onError get called. If everything goes right, onComplete get called in the end. And onSubscribe get called when there are something subscribe to Flơwable. 

```java
public interface Subscriber<T> {
    public void onSubscribe(Subscription s);
    public void onNext(T t);
    public void onError(Throwable t);
    public void onComplete();
}
```
    - Subscribe to Observable by Observer. Its totally same with Flowable except do not support BackPressure

```java
    public interface Observer<T> {
    void onSubscribe(Disposable d);
    void onNext(T t);
    void onError(Throwable e);
    void onComplete();
}

```
    - Subscribe to Single by SingleObserver. Use it in case of data stream only emit one item and complete. So onNext should be replaced by onSuccess

```java
public interface SingleObserver<T> {
    void onSubscribe(Disposable d);
    void onSuccess(T t);
    void onError(Throwable e);
}

```

- Subscribe to Maybe by MaybeObserver. Same with Single except data stream can emit one item or jump directly to onComplete without emit anything.

```java
public interface MaybeObserver<T> {
    void onSubscribe(Disposable d);
    void onSuccess(T t);
    void onError(Throwable e);
    void onComplete();
}
```

- Subscribe to Completable by CompletableObserver. When you don't care about data, you only want to know result is success or fail. Completable is either onComplete or onError

```java
public interface CompletableObserver {
    void onSubscribe(Disposable d);
    void onComplete();
    void onError(Throwable e);
}

```

Next up, we will getting to know how create above kind of Observable. We can emit specific item with `just` or a list of item with `fromArray`, `fromIterable`, or use data return  `fromCallable`, or even `create` raw stream.

```java
Flowable.just("XXX");
  Observable.just("XXX");
  Maybe.just("XXX");
  Single.just("XXX");

  Flowable.fromArray({"xxx", "xx"})
  Observable.fromIterable({"x", "x"})
  Observable.fromCallable(new Callable<String>() {
    public String call() {
      return getName();
    }

  });
  Observable.create(e -> {
    e.onNext("XXX");
    e.onComplete();
  });
  ```

This is how retrofit make data from OkHttpClient return in form of data stream with observable.
```java
  OkHttpClient client = // ...
  Request request = // ...
  Observable.create(e -> {
    Call call = client.newCall(request);
    call.enqueue(new Callback() {
        public void onResponse(Response r) throws IOException {
            e.onNext(r.body().string());
            e.onComplete();
        }
        public void onFailure(IOException e) {
            e.onError(e);
        }
    }
  });
```

After having an observable, we ussually have to "cook" that data stream before It's able to "eat". There are a ton of operator we can use that cover most of the cases [RxJava Operator](http://reactivex.io/documentation/operators.html#alphabetical). I'll mention some of operators which I ussually use in my projects. Let's think about login/register function, every app should have it. We let user register and do the login automatically. After login success, We gonna save access token into share preferences to use later. These steps can be easily done with Rxjava and its operator:
    - Call register api, return an observable for that register request
    - Use flatmap operator with login. so that, after register successful, call login api
    - Use map operator with sharedpreferences, so that, after login successful, parse data, get access token from it and save to sharepreferences
    - Subscribe to above stream, so that, when all of steps success full, go to home page. In case of any errors happen, notify to user 

It's enough for basic concept, now is the main part. Let's dive deeper!
The architecture of RxJava as I said above, is rely on Observable Pattern. Basic concept is still the same - when observer subscribe to observable, observable keep a list of observer and notify to them with stream data. For example, what does Observable.just("xXx") do? It simple call doOnNext("xXx") which notify to observer and onComplete() after that. You can take a look at library - `ObsevableScalarXMap.java`
```java
 if (get() == START && compareAndSet(START, ON_NEXT)) {
                observer.onNext(value);
                if (get() == ON_NEXT) {
                    lazySet(ON_COMPLETE);
                    observer.onComplete();
                }
            }
```
With `Observable.fromArray({"abc","xyz"});` RxJava create an ObservableFromArray which has a field is array. When observer subscribe to it, the following code will be triggered and you will find out why onNext get call 2 times before onComplete()
```java
  T[] a = array;
            int n = a.length;

            for (int i = 0; i < n && !isDisposed(); i++) {
                T value = a[i];
                if (value == null) {
                    actual.onError(new NullPointerException("The " + i + "th element is null"));
                    return;
                }
                actual.onNext(value);
            }
            if (!isDisposed()) {
                actual.onComplete();
            }
```
Ok! let's talk about how Operator works on RxJava. Remember that we use observer to subscribe to an observable, the flow is nothing than normal java code. `subscribe()` method cause observable run kinda function like above. Loop through an array, do a network request, process somethings or simple return a item. onNext will get called to send data to observer. Operator is just the way Rxjava insert some of code lines before onNext actual get called on observer. For example, when we use `map` operator, RxJava actually create a new Observer that wrap the actual Observer to do some action. 
```java
public final class ObservableMap<T, U> extends AbstractObservableWithUpstream<T, U> {
    final Function<? super T, ? extends U> function;

    public ObservableMap(ObservableSource<T> source, Function<? super T, ? extends U> function) {
        super(source);
        this.function = function;
    }

    @Override
    public void subscribeActual(Observer<? super U> t) {
        source.subscribe(new MapObserver<T, U>(t, function));
    }


    static final class MapObserver<T, U> extends BasicFuseableObserver<T, U> {
        final Function<? super T, ? extends U> mapper;

        MapObserver(Observer<? super U> actual, Function<? super T, ? extends U> mapper) {
            super(actual);
            this.mapper = mapper;
        }

        @Override
        public void onNext(T t) {
            if (done) {
                return;
            }

            if (sourceMode != NONE) {
                actual.onNext(null);
                return;
            }

            U v;

            try {
                v = ObjectHelper.requireNonNull(mapper.apply(t), "The mapper function returned a null value.");
            } catch (Throwable ex) {
                fail(ex);
                return;
            }
            actual.onNext(v);
        }

        @Override
        public int requestFusion(int mode) {
            return transitiveBoundaryFusion(mode);
        }

        @Nullable
        @Override
        public U poll() throws Exception {
            T t = qs.poll();
            return t != null ? ObjectHelper.<U>requireNonNull(mapper.apply(t), "The mapper function returned a null value.") : null;
        }
    }
}
```

See that onNext method in MapObserver. It execute `mapper.apply(t)` before continue to call actual.onNext(v). This is how Rxjava apply an operator on observable. You can see there are a lot of Observable along with Observer inside Rxjava library. Each of operator corresponding with one class Observable:
- Flatmap -> ObservableFlatMap
- Take -> ObservableTake
- Filter -> ObservableFilter
- Zip -> ObservableZip
- ....

Especially, `observerOn()`  and `subscribeOn()` is the functions which help us switch thread. They are more complicate than another one. We must have strong knowledge about Thread and ThreadPool in Java to understand what Schedulers is. From there understand `observeOn(AndroidSchedulers.mainThread())` and `subscribeOn(Schedulers.io())`. We can think Scheduler as a place that receive a task and execute that task in a specific thread. Some types of Scheduler is:
- Schedulers.io() - use for network task, database CRUD task, read/write File task...
- Schedulers.computation() - use for heavy compute task, process somethings in background
- Schedulers.newThread() - do not use Threadpool, always create a new task to do task
- Schedulers.single() - only use one thread no matter how many tasks. Tasks would be waited in a Queue
- Schedulers.trampoline() - like single but work on current thread, its only executed after current task is complete
- AndroidSchedulers.mainThread() - you know what it is :)

`observerOn()`  and `subscribeOn()` are easily make you confuse. Remember that `observerOn()` decide what thread obsever run while  `subscribeOn()` decide thread for observable and even whole of operator and observer if  `observerOn()`  doesn't used. Yay, I know your feeling :D. Let's see this example:
```java
 getObservable()
                // Run observable on background thead with io thread pool
                .subscribeOn(Schedulers.io())
                .map(e-> ...) // This still run on background thread
                .observeOn(AndroidSchedulers.mainThread())
                .map(e -> ...) // Now this run on Main thread
                .observeOn(Schedulers.newThread()) 
                .map(e-> ...) // Turn to background thread again, but do not belong to any thread pool
                .subscribe(getObserver()); // Observer run on background thread
```
I hope you will see that mechanism and know how to switch thread. Because `observerOn()`  and `subscribeOn()` are also the operators, So when you use it, RxJava will create `ObservableObserveOn` and `ObservableSubscribeOn` what wrap the actual observable. `ObservableSubscribeOn`, It run `observable.subscribe()` on specific thread while `ObservableObserveOn` will run `onNext()` and `onComplete()` on specific thread. Yay, that's how RxJava switch thread for you. 

There are still a lot of things I want to discuss but I think this post is long enough for us. I can't cover anything about RxJava in a post. So, please drop a comment below to let me know what you want to know, and what you don't understand yet. I will try my best to update and make post more useful. 
