---
title: Understanding Data-Binding's generated code and How does Android Data-Binding compiler work
date: "2017-02-28T23:46:37.121Z"
cover: cover-android-databinding.png
categories: "TECHNOLOGY / ANDROID"
---
This post isn't for who want to learn how to use Android data-binding or getting to know the basis concept. I suggest you go directly to [Google Documentation](https://developer.android.com/topic/libraries/data-binding/index.html) as a great starting point, which helps you integrate data-binding easily, a number of example code as well as other cool stuffs you can achieve when decided to apply it for your project. After having some experiences with data-binding, you guys may curious about what happen under the hood, how Google make tradditional XML files are able to combine with data-binding, how can xml interact with java code, and how its compiler give us the magic. This topic intent to expose a big picture about data-binding mechanism, and a deeply look into what happen underlying. So, developers will have a deeper understand which help them use data-binding in the right way, take advantage of data-binding power to build the great app. 


-----


Recently, data-binding is a hottest android trend, which make developer life easier. Plenty of developers move to data-binding because of its beauty. But honestly, data-binding brings us a lot of troubles. Although, data-binding concept is pretty simple: "Yay! define a ViewModel class and try to match it to layout.xml, and we don't care about UI anymore, our data go straight into UI in a magic way." Really fast, really simple, but nothing is a bullet-silver. When something goes wrong, when your data suddenly cannot go to UI, when compiler raise a plenty of error messages and you really don't know what it means. What can we do!


-----


I have to face with these data-binding issue a lot and use a variety of tricks to get over. And I think, there is no way but take a look at data-binding code, find out how it works and I wouldn't have to deal with these issues anymore. Let's clone this Repository from Google and read code together [Data-Binding Repository](https://android.googlesource.com/platform/frameworks/data-binding/)



### Part 1: Data-binding flow, Obsevable pattern mechanism and what data-binding's generated-code means
 
 **To remember the code on higher layer, which we use in our application to play with data-binding, I created a simplest set of component as an example.**
1. Create a simple R.layout.activity_main
```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <data>

        <variable
            name="viewModel"
            type="com.example.main.MainViewModel" />

    </data>

    <TextView android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:text="@{ viewModel.text }" />

</layout>
```
2. Create a simple MainActivity 
```java
public class MainActivity extends AppCompatActivity {

    @Inject
    MainViewModel mViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActivityMainBinding bind = DataBindingUtil.setContentView(this, R.layout.activity_main);
        bind.setViewModel(mViewModel);
    }
}
```
3. Create MainViewModel 
```java
public class MainViewModel extends BaseObservable  {

    public final ObservableField<String> text = new ObservableField<>();

    public MainViewModel() {
    }

}
```


-----


**After compile the project, here are the new files we got from data-binding:**

1.  activity_main-layout.xml *(in data-binding-info folder)*
```xml
<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<Layout layout="activity_main" absoluteFilePath="/home/framgia/Projects/harpa-crista/harpacrista/android/app/src/main/res/layout/activity_main.xml"
    directory="layout"
    isMerge="false" modulePackage="com.harpacrista">
    <Variables declared="true" name="viewModel" type="com.example.main.MainViewModel">
        <location endLine="8" endOffset="51" startLine="6" startOffset="8" />
    </Variables>
    <Imports name="View" type="android.view.View">
        <location endLine="10" endOffset="42" startLine="10" startOffset="8" />
    </Imports>
    <Targets>
        <Target tag="layout/activity_main_0" view="TextView">
            <Expressions>
                <Expression attribute="android:text" text=" viewModel.text ">
                    <Location endLine="16" endOffset="41" startLine="16" startOffset="8" />
                    <TwoWay>false</TwoWay>
                    <ValueLocation endLine="16" endOffset="39" startLine="16" startOffset="24" />
                </Expression>
            </Expressions>
            <location endLine="16" endOffset="44" startLine="14" startOffset="4" />
        </Target>
    </Targets>
</Layout>
```


2. An shorter activity_main.xml version *(in data-binding-layout-out folder)*
```xml
<?xml version="1.0" encoding="utf-8"?>

<TextView xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:tag="layout/activity_main_0" />
   
```


3. And ActivityMainBinding.java, this is our main actor, where most of the magic happens.
```java
public class ActivityMainBinding extends android.databinding.ViewDataBinding  {

    private static final android.databinding.ViewDataBinding.IncludedLayouts sIncludes;
    private static final android.util.SparseIntArray sViewsWithIds;
    static {
        sIncludes = null;
        sViewsWithIds = null;
    }
    // views
    private final android.widget.TextView mboundView0;
    // variables
    private com.example.main.MainViewModel mViewModel;
    // values
    // listeners
    // Inverse Binding Event Handlers

    public ActivityMainBinding(android.databinding.DataBindingComponent bindingComponent, View root) {
        super(bindingComponent, root, 2);
        final Object[] bindings = mapBindings(bindingComponent, root, 1, sIncludes, sViewsWithIds);
        this.mboundView0 = (android.widget.TextView) bindings[0];
        this.mboundView0.setTag(null);
        setRootTag(root);
        // listeners
        invalidateAll();
    }

    @Override
    public void invalidateAll() {
        synchronized(this) {
                mDirtyFlags = 0x4L;
        }
        requestRebind();
    }

    @Override
    public boolean hasPendingBindings() {
        synchronized(this) {
            if (mDirtyFlags != 0) {
                return true;
            }
        }
        return false;
    }

    public boolean setVariable(int variableId, Object variable) {
        switch(variableId) {
            case BR.viewModel :
                setViewModel((com.example.main.MainViewModel) variable);
                return true;
        }
        return false;
    }

    public void setViewModel(com.example.main.MainViewModel viewModel) {
        updateRegistration(0, viewModel);
        this.mViewModel = viewModel;
        synchronized(this) {
            mDirtyFlags |= 0x1L;
        }
        notifyPropertyChanged(BR.viewModel);
        super.requestRebind();
    }
    public com.example.main.MainViewModel getViewModel() {
        return mViewModel;
    }

    @Override
    protected boolean onFieldChange(int localFieldId, Object object, int fieldId) {
        switch (localFieldId) {
            case 0 :
                return onChangeViewModel((com.example.main.MainViewModel) object, fieldId);
            case 1 :
                return onChangeTextViewMode((android.databinding.ObservableField<java.lang.String>) object, fieldId);
        }
        return false;
    }
    private boolean onChangeViewModel(com.example.main.MainViewModel viewModel, int fieldId) {
        switch (fieldId) {
            case BR._all: {
                synchronized(this) {
                        mDirtyFlags |= 0x1L;
                }
                return true;
            }
        }
        return false;
    }
    private boolean onChangeTextViewMode(android.databinding.ObservableField<java.lang.String> textViewModel, int fieldId) {
        switch (fieldId) {
            case BR._all: {
                synchronized(this) {
                        mDirtyFlags |= 0x2L;
                }
                return true;
            }
        }
        return false;
    }

    @Override
    protected void executeBindings() {
        long dirtyFlags = 0;
        synchronized(this) {
            dirtyFlags = mDirtyFlags;
            mDirtyFlags = 0;
        }
        com.example.main.MainViewModel viewModel = mViewModel;
        java.lang.String textViewModel = null;
        android.databinding.ObservableField<java.lang.String> textViewModel1 = null;

        if ((dirtyFlags & 0x7L) != 0) {



                if (viewModel != null) {
                    // read viewModel.text
                    textViewModel1 = viewModel.text;
                }
                updateRegistration(1, textViewModel1);


                if (textViewModel1 != null) {
                    // read viewModel.text.get()
                    textViewModel = textViewModel1.get();
                }
        }
        // batch finished
        if ((dirtyFlags & 0x7L) != 0) {
            // api target 1

            android.databinding.adapters.TextViewBindingAdapter.setText(this.mboundView0, textViewModel);
        }
    }
    // Listener Stub Implementations
    // callback impls
    // dirty flag
    private  long mDirtyFlags = 0xffffffffffffffffL;

    public static ActivityMainBinding inflate(android.view.LayoutInflater inflater, android.view.ViewGroup root, boolean attachToRoot) {
        return inflate(inflater, root, attachToRoot, android.databinding.DataBindingUtil.getDefaultComponent());
    }
    public static ActivityMainBinding inflate(android.view.LayoutInflater inflater, android.view.ViewGroup root, boolean attachToRoot, android.databinding.DataBindingComponent bindingComponent) {
        return android.databinding.DataBindingUtil.<ActivityMainBinding>inflate(inflater, com.harpacrista.R.layout.activity_main, root, attachToRoot, bindingComponent);
    }
    public static ActivityMainBinding inflate(android.view.LayoutInflater inflater) {
        return inflate(inflater, android.databinding.DataBindingUtil.getDefaultComponent());
    }
    public static ActivityMainBinding inflate(android.view.LayoutInflater inflater, android.databinding.DataBindingComponent bindingComponent) {
        return bind(inflater.inflate(com.harpacrista.R.layout.activity_main, null, false), bindingComponent);
    }
    public static ActivityMainBinding bind(android.view.View view) {
        return bind(view, android.databinding.DataBindingUtil.getDefaultComponent());
    }
    public static ActivityMainBinding bind(android.view.View view, android.databinding.DataBindingComponent bindingComponent) {
        if (!"layout/activity_main_0".equals(view.getTag())) {
            throw new RuntimeException("view tag isn't correct on view:" + view.getTag());
        }
        return new ActivityMainBinding(bindingComponent, view);
    }
    /* flag mapping
        flag 0 (0x1L): viewModel
        flag 1 (0x2L): viewModel.text
        flag 2 (0x3L): null
    flag mapping end*/
    //end
}
```


-----

As we can see above, from our activity_main.xml, data-binding generate for us 3 extra files: an `activity_main-layout.xml`, an shorter version `activity_main.xml` and an `ActivityMainBinding.java`. From there, we can have a first look at  generated code from xml layout.
Basically, an xml layout with outter tag` <Layout></Layout>` is different from the normal one. If the normal layout xml was used directly by android application, and sit in res/layout folder inside apk package, then xml layout with outter tag `<Layout></Layout>` was used indirectly. The compiler search through app layout folder to compile any file with outter tag `<Layout></Layout>` into the shorter version of activity_main.xml. And this version xml look exactly like the normal layout xml, which we gonna write if we don't go on data-binding way.

So, bassically, xml layout with data-binding is just a special version of the normal one, data-binding give them some lexical and grammar and force them rewrite normal layout in this way. Xml file cannot be understood by Android Framework, It's only understandable by data-binding compiler, and help compiler know where and how the data from ViewModel can map to View. Finally, compiler translate xml file into normal version, which is put inside apk beside activity_main-layout.xml and ActivityMainBinding.java 

We can imagine that the original xml file contains 2 part: the normal part and the binding-part. Normal part is exactly the code we gonna write without binding. The binding-part is the code that help compiler able to generate java code, which is a nicely bridge between UI and Data. 

activity_main-layout.xml *(in data-binding-info folder)*  contains the binding-part. Just like its name, this file is the information about binding ability of the layout. Look at this file again. Outer tag is still `<layout>` tag, but It's not like before. 
```xml
<Layout layout="activity_main" absoluteFilePath="/home/framgia/android/app/src/main/res/layout/activity_main.xml"
    directory="layout" isMerge="false" modulePackage="com.harpacrista">
    ...
</Layout>
```
layout="activity_main" attribute indicate this file is the binding-part of acitivity_main.xml, which currently located at "/home/framgia/android/app/src/main/res/layout/activity_main.xml". 
Inside `<Layout>` tag, no doubt, there are `<Variables>` tag  and `<Import>` tag. Because we define/improve this before to setViewModel, and reference to some class in layout.
```xml
<Variables declared="true" name="viewModel" type="com.example.main.MainViewModel">
        <location endLine="8" endOffset="51" startLine="6" startOffset="8" />
</Variables>
<Imports name="View" type="android.view.View">
        <location endLine="10" endOffset="42" startLine="10" startOffset="8" />
</Imports>
```
They also contains location information. I don't know why compiler need to save this location of Variable/Import, maybe its used for trace back or something like that.
And this is most important info in this file, `<Target>` tag tell compiler where the ViewModel should map to View,  binding type is one-way or two-way, location of View, location of value in View, 
```xml
 <Targets>
        <Target tag="layout/activity_main_0" view="TextView">
            <Expressions>
                <Expression attribute="android:text" text=" viewModel.text ">
                    <Location endLine="16" endOffset="41" startLine="16" startOffset="8" />
                    <TwoWay>false</TwoWay>
                    <ValueLocation endLine="16" endOffset="39" startLine="16" startOffset="24" />
                </Expression>
            </Expressions>
            <location endLine="16" endOffset="44" startLine="14" startOffset="4" />
        </Target>
    </Targets>
```
We have a list of `<Target>` tags here. Remember we can have many View/ViewGroup in layout, but only View/ViewGroup contains data-binding expression are appeared here. And `<Expression>` tag inside `<Target>` tag is represent for data-binding expression in View. For example:
- Data-binding expression
     `android:visibility="@{ viewModel.isVisible ? View.VISIBLE : View.INVISIBLE }"` 
will be compiled to 
            
                <Expression attribute="android:visibility"
                            text=" viewModel.isVisible ? View.VISIBLE : View.INVISIBLE ">
                        <Location endLine="29" endOffset="88" startLine="29" startOffset="12" />
                        <TwoWay>false</TwoWay>
                        <ValueLocation endLine="29" endOffset="86" startLine="29" startOffset="34" />
                </Expression>
                        
- Data-binding expression
   `android:text="@{ viewModel.text }"`
  will be compiled to 

            <Expression attribute="android:text" text=" viewModel.text ">
                    <Location endLine="23" endOffset="45" startLine="23" startOffset="12" />
                    <TwoWay>false</TwoWay>
                    <ValueLocation endLine="23" endOffset="43" startLine="23" startOffset="28" />
            </Expression>


Pay attention to `<Expression attribute="android:text" text=" viewModel.text ">` . This is the bridge between View and ViewModel, what we are looking. Variable text in ViewModel now connect to android:text attribute in TextView. This is what we are expected. But from this xml information file to java code is still in mistery. Let' go to ActivityMainBinding.java.


-----


ActivityMainBinding.java is the subclass of ViewDataBinding, and developers are able to setViewModel into Layout here. It looks like java version of xml layout that I show you above. Each of View/ViewGroup tag in xml layout is a variable in this class. For example

```xml
<LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        >

        <TextView
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:text="@{ viewModel.text }"
            />

        <Button
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:visibility="@{ viewModel.isVisible ? View.VISIBLE : View.INVISIBLE }"
            />
    </LinearLayout>
```
wil turn to 

```java
public class ActivityMainBinding extends android.databinding.ViewDataBinding  {

    private static final android.databinding.ViewDataBinding.IncludedLayouts sIncludes;
    private static final android.util.SparseIntArray sViewsWithIds;
    static {
        sIncludes = null;
        sViewsWithIds = null;
    }
    // views
    private final android.widget.LinearLayout mboundView0;
    private final android.widget.TextView mboundView1;
    private final android.widget.Button mboundView2;
    ...
}
```
And if you specify a id for a View in layout, this private field will become public field, and you can you use it immediately without call findViewById()

```java
// views
    private final android.widget.LinearLayout mboundView0;
    private final android.widget.Button mboundView2;
    public final android.widget.TextView tvTest;
```

That's convenient! Access to arbitrary View in layout is easier than ever. The variable name is same as android:id. In case of android:id with underscore convention, that name turn to camelCase, such as:  `android:id="@+id/tv_test"` -> `public final android.widget.TextView tvTest;`
`<variable>` tag definitely become variable in java class, which pretty familiar with us through setViewModel method. By the way, I want to mention Obsevable pattern when talking to ViewModel. Observable pattern is the key thing, make View got updated whenever ViewModel has changed, and ViewModel receive new data automatically when user interract with View. There are full of Obsevable types that cover whole of java data type:

    ObservableArrayList
    ObservableArrayMap
    ObservableBoolean
    ObservableByte
    ObservableChar
    ObservableDouble
    ObservableField
    ObservableFloat
    ObservableInt
    ObservableLong
    ObservableParcelable
    ObservableShort

This set of classes is pretty similar and simple. All extend from BaseObservable, contain only one variable, one getter and one setter. setter check whether new value is different from the old value or not, if new value is set then notifyChange() would be called, and Views will receive the update. But, **How notifyChange() affect to Views?**
To answer above question, I'll try to explain it as simple as I can with this simple case: 
- **Expected:** We change isShowView variable in ViewModel to false,  View in actiivty_main.xml become invisible. 
- **What happens underlying:** 
    - When we setViewModel to ActivityMainBinding, updateRegistration was called to create the "bridge" between ViewModel and View
    - I'll show you what the "bridge" looks like 


```java
    /**
     * Method object extracted out to attach a listener to a bound Observable object.
     */
    private static final CreateWeakListener CREATE_PROPERTY_LISTENER = new CreateWeakListener() {
        @Override
        public WeakListener create(ViewDataBinding viewDataBinding, int localFieldId) {
            return new WeakPropertyListener(viewDataBinding, localFieldId).getListener();
        }
    };
    
    ....
    
     private static class WeakPropertyListener extends Observable.OnPropertyChangedCallback
            implements ObservableReference<Observable> {
        final WeakListener<Observable> mListener;

        public WeakPropertyListener(ViewDataBinding binder, int localFieldId) {
            mListener = new WeakListener<Observable>(binder, localFieldId, this);
        }

        @Override
        public WeakListener<Observable> getListener() {
            return mListener;
        }

        @Override
        public void addListener(Observable target) {
            target.addOnPropertyChangedCallback(this);
        }

        @Override
        public void removeListener(Observable target) {
            target.removeOnPropertyChangedCallback(this);
        }

        @Override
        public void onPropertyChanged(Observable sender, int propertyId) {
            ViewDataBinding binder = mListener.getBinder();
            if (binder == null) {
                return;
            }
            Observable obj = mListener.getTarget();
            if (obj != sender) {
                return; // notification from the wrong object?
            }
            binder.handleFieldChange(mListener.mLocalFieldId, sender, propertyId);
        }
    }
    
    ...
    
     private static class WeakListener<T> extends WeakReference<ViewDataBinding> {
        private final ObservableReference<T> mObservable;
        protected final int mLocalFieldId;
        private T mTarget;

        public WeakListener(ViewDataBinding binder, int localFieldId,
                ObservableReference<T> observable) {
            super(binder);
            mLocalFieldId = localFieldId;
            mObservable = observable;
        }

        public void setTarget(T object) {
            unregister();
            mTarget = object;
            if (mTarget != null) {
                mObservable.addListener(mTarget);
            }
        }
    }
```
  
  
- mListener variable in `WeakPropertyListener` keep a weak reference to `MainDataBinding` , `setTarget` method in  `WeakListener` will be called that bind `ViewModel` to `MainDataBinding`
- From there, change `isShowView` variable in `ViewModel` will call notifyCallback(), which notify on `mNotifier` 


```java
private void notifyCallbacks(T sender, int arg, A arg2, int startIndex, int endIndex, long bits) {
        long bitMask = 1L;

        for(int i = startIndex; i < endIndex; ++i) {
            if((bits & bitMask) == 0L) {
                this.mNotifier.onNotifyCallback(this.mCallbacks.get(i), sender, arg, arg2);
            }

            bitMask <<= 1;
        }

    }

```


- And `mNotifier` is also `WeakPropertyListener`. So, change `isShowView` on `ViewModel` will notify `WeakPropertyListener`, here is the place where `isShowView` affect to View and make it invisible. `executeBindings()` on `ActivityMainBinding` take the value and map to corresponding View on UI.

```java
@Override
    protected void executeBindings() {
        long dirtyFlags = 0;
        synchronized(this) {
            dirtyFlags = mDirtyFlags;
            mDirtyFlags = 0;
        }
        com.example.main.MainViewModel viewModel = mViewModel;
        int isVisibleViewModelVI = 0;
        boolean isVisibleViewModel = false;
        java.lang.String textViewModel = null;
        android.databinding.ObservableBoolean isVisibleViewModel1 = null;
        android.databinding.ObservableField<java.lang.String> textViewModel1 = null;

        if ((dirtyFlags & 0xfL) != 0) {


            if ((dirtyFlags & 0xbL) != 0) {

                    if (viewModel != null) {
                        // read viewModel.isVisible
                        isVisibleViewModel1 = viewModel.isVisible;
                    }
                    updateRegistration(1, isVisibleViewModel1);


                    if (isVisibleViewModel1 != null) {
                        // read viewModel.isVisible.get()
                        isVisibleViewModel = isVisibleViewModel1.get();
                    }
                    if((dirtyFlags & 0xbL) != 0) {
                        if (isVisibleViewModel) {
                            dirtyFlags |= 0x20L;
                        } else {
                            dirtyFlags |= 0x10L;
                        }}


                    // read viewModel.isVisible.get() ? View.VISIBLE : View.INVISIBLE
                    isVisibleViewModelVI = (isVisibleViewModel) ? (android.view.View.VISIBLE) : (android.view.View.INVISIBLE);
            }
            if ((dirtyFlags & 0xdL) != 0) {

                    if (viewModel != null) {
                        // read viewModel.text
                        textViewModel1 = viewModel.text;
                    }
                    updateRegistration(2, textViewModel1);


                    if (textViewModel1 != null) {
                        // read viewModel.text.get()
                        textViewModel = textViewModel1.get();
                    }
            }
        }
        // batch finished
        if ((dirtyFlags & 0xbL) != 0) {
            // api target 1

            this.mboundView2.setVisibility(isVisibleViewModelVI);
        }
        if ((dirtyFlags & 0xdL) != 0) {
            // api target 1

            android.databinding.adapters.TextViewBindingAdapter.setText(this.tvTest, textViewModel);
        }
    }
```

- We can see above code. Whenever ViewModel change their value, It will notify on `executeBindings()` method, this method rely on this value and execute an action on View, such as
 `this.mboundView2.setVisibility(isVisibleViewModelVI);`
 `  android.databinding.adapters.TextViewBindingAdapter.setText(this.tvTest, textViewModel);`
 - This is why we have to write @BindingAdapter and @BindingMethod to execute an action on View, e.g: recyclerView.setAdapter(), viewPager.setOnPageChange(), ...
 - However, Android already create a large of built-in BindingAdapters and BindingMethod, so developer most of time just reuse it. We only have to write our own code in special case or in the case Android still haven't support yet. In this case, `isShowView` is false equivalent to View.INVISIBLE that make View.setVisibility(View.INVISIBLE). That's all.
 - Before go to the next section, I would like to show you the data-binding built-in adapters. Keep using these and don't reinvent the wheel. I've seen so many developer abuse @BindingAdapter to rewrite what are already out there. What's a waste!

![](https://viblo.asia/uploads/1155b1c5-44e6-4a49-a7d3-6ad466f62522.png)
 
 ### Part 2. How does data-binding compiler generate code 
 
 Did you clone official data-binding git repository as I give you above ? [Data-Binding Repository](https://android.googlesource.com/platform/frameworks/data-binding/)
 After understand how generated code work to bring us data-binding ability between View and ViewModel, in this section, we will find out the way compiler generate that magic code.
 Pay attention to 2 modules: `compiler` and `compilerCommon`. We mostly look around there. 
 - The heart of compiler is `ProcessDataBinding` class inside `compiler.android.databinding.annotationprocessor`. This class take responsibility for run a list of process step one by one.  


```java
         mProcessingSteps = Arrays.asList(
                new ProcessMethodAdapters(),
                new ProcessExpressions(),
                new ProcessBindable()
        );
```

- We go to the first process step - ProcessMethodAdapters. This class suppose to be search in all of current classes in project for which classes, which methods are annotated by following annotations: `@BindingAdapter`, `@Untaggable`, `@BindingMethods`, `@BindingConversion`, `@InverseBindingAdapter`, `@InverseBindingMethods`. And save all of them in SetterStore, which should be used later in executeBinding as we discuss above. During compile time, this information from annotation processor will be saved into file, that locate at `setter_store.bin` 

```java
@Override
    public boolean onHandleStep(RoundEnvironment roundEnv,
            ProcessingEnvironment processingEnvironment, BindingBuildInfo buildInfo) {
        L.d("processing adapters");
        final ModelAnalyzer modelAnalyzer = ModelAnalyzer.getInstance();
        Preconditions.checkNotNull(modelAnalyzer, "Model analyzer should be"
                + " initialized first");
        SetterStore store = SetterStore.get(modelAnalyzer);
        clearIncrementalClasses(roundEnv, store);

        addBindingAdapters(roundEnv, processingEnvironment, store);
        addRenamed(roundEnv, store);
        addConversions(roundEnv, store);
        addUntaggable(roundEnv, store);
        addInverseAdapters(roundEnv, processingEnvironment, store);
        addInverseMethods(roundEnv, store);

        try {
            store.write(buildInfo.modulePackage(), processingEnvironment);
        } catch (IOException e) {
            L.e(e, "Could not write BindingAdapter intermediate file.");
        }
        return true;
    }
    
    ...
    
    public void write(String projectPackage, ProcessingEnvironment processingEnvironment)
            throws IOException {
        GenerationalClassUtil.writeIntermediateFile(processingEnvironment,
                projectPackage, projectPackage +
                        GenerationalClassUtil.ExtensionFilter.SETTER_STORE.getExtension(), mStore);
    }
    
    ...
    
    public enum ExtensionFilter {
        BR("-br.bin"),
        LAYOUT("-layoutinfo.bin"),
        SETTER_STORE("-setter_store.bin");
        private final String mExtension;
        ExtensionFilter(String extension) {
            mExtension = extension;
        }

        public boolean accept(String entryName) {
            return entryName.endsWith(mExtension);
        }

        public String getExtension() {
            return mExtension;
        }
    }
```

- The second step is ProcessExpressions. This process step looking for all of xml files in projects and parse xml file support data-binding which have `<layout></layout>` outter tag. Split this file into 2 files as I mention in section 1: `activity_main.xml` (normal layout) and `activity_main-layout.xml` (contains binding info). `LayoutBinder` class is most interesting, it use layoutBundle (from XmlParser) to calculate expression, location and target in  `activity_main-layout.xml`.

```java
@XmlAccessorType(XmlAccessType.NONE)
    @XmlRootElement(name="Layout")
    public static class LayoutFileBundle implements Serializable, FileScopeProvider {
        @XmlAttribute(name="layout", required = true)
        public String mFileName;
        @XmlAttribute(name="modulePackage", required = true)
        public String mModulePackage;
        @XmlAttribute(name="absoluteFilePath", required = true)
        public String mAbsoluteFilePath;
        private String mConfigName;

        // The binding class as given by the user
        @XmlAttribute(name="bindingClass", required = false)
        public String mBindingClass;

        // The location of the name of the generated class, optional
        @XmlElement(name = "ClassNameLocation", required = false)
        private Location mClassNameLocation;
        // The full package and class name as determined from mBindingClass and mModulePackage
        private String mFullBindingClass;

        // The simple binding class name as determined from mBindingClass and mModulePackage
        private String mBindingClassName;

        // The package of the binding class as determined from mBindingClass and mModulePackage
        private String mBindingPackage;

        @XmlAttribute(name="directory", required = true)
        public String mDirectory;
        public boolean mHasVariations;

        @XmlElement(name="Variables")
        public List<VariableDeclaration> mVariables = new ArrayList<VariableDeclaration>();

        @XmlElement(name="Imports")
        public List<NameTypeLocation> mImports = new ArrayList<NameTypeLocation>();

        @XmlElementWrapper(name="Targets")
        @XmlElement(name="Target")
        public List<BindingTargetBundle> mBindingTargetBundles = new ArrayList<BindingTargetBundle>();

        @XmlAttribute(name="isMerge", required = true)
        private boolean mIsMerge;
        
        ...
        
    }
```    
    
```java
 public LayoutBinder(ResourceBundle.LayoutFileBundle layoutBundle) {
        try {
            Scope.enter(this);
            mExprModel = new ExprModel();
            mExpressionParser = new ExpressionParser(mExprModel);
            mBindingTargets = new ArrayList<BindingTarget>();
            mBundle = layoutBundle;
            mModulePackage = layoutBundle.getModulePackage();
            HashSet<String> names = new HashSet<String>();
            // copy over data.
            for (ResourceBundle.VariableDeclaration variable : mBundle.getVariables()) {
                addVariable(variable.name, variable.type, variable.location, variable.declared);
                names.add(variable.name);
            }

            for (ResourceBundle.NameTypeLocation userImport : mBundle.getImports()) {
                mExprModel.addImport(userImport.name, userImport.type, userImport.location);
                names.add(userImport.name);
            }
            if (!names.contains("context")) {
                mExprModel.builtInVariable("context", "android.content.Context",
                        "getRoot().getContext()");
                names.add("context");
            }
            for (String javaLangClass : sJavaLangClasses) {
                mExprModel.addImport(javaLangClass, "java.lang." + javaLangClass, null);
            }
            // First resolve all the View fields
            // Ensure there are no conflicts with variable names
            for (BindingTargetBundle targetBundle : mBundle.getBindingTargetBundles()) {
                try {
                    Scope.enter(targetBundle);
                    final BindingTarget bindingTarget = createBindingTarget(targetBundle);
                    if (bindingTarget.getId() != null) {
                        final String fieldName = LayoutBinderWriterKt.
                                getReadableName(bindingTarget);
                        if (names.contains(fieldName)) {
                            L.w("View field %s collides with a variable or import", fieldName);
                        } else {
                            names.add(fieldName);
                            mExprModel.viewFieldExpr(bindingTarget);
                        }
                    }
                } finally {
                    Scope.exit();
                }
            }

            for (BindingTarget bindingTarget : mBindingTargets) {
                try {
                    Scope.enter(bindingTarget.mBundle);
                    for (BindingTargetBundle.BindingBundle bindingBundle : bindingTarget.mBundle
                            .getBindingBundleList()) {
                        try {
                            Scope.enter(bindingBundle.getValueLocation());
                            bindingTarget.addBinding(bindingBundle.getName(),
                                    parse(bindingBundle.getExpr(), bindingBundle.isTwoWay(),
                                            bindingBundle.getValueLocation()));
                        } finally {
                            Scope.exit();
                        }
                    }
                    bindingTarget.resolveTwoWayExpressions();
                    bindingTarget.resolveMultiSetters();
                    bindingTarget.resolveListeners();
                } finally {
                    Scope.exit();
                }
            }
            mSortedBindingTargets = new ArrayList<BindingTarget>(mBindingTargets);
            Collections.sort(mSortedBindingTargets, COMPARE_FIELD_NAME);
        } finally {
            Scope.exit();
        }
    }
```

- And third step is ProcessBindable. This process generate BR class, which how binding property id, e.g: BR.text, BR.item, BR.isShowView, ... 
- Finally, you might wonder where the important class like MainDataBinding is created. I don't know why Google wrote it in Kotlin but It's at DataBinderWriter.kt and LayoutBinderWriter.kt. You guys can explore these files a little bit. 


### Conclusion
I hope you guys can read until the end of topic, because this topic is pretty complex and difficult especially with newcomer to MVVM world, so you guys may feel hard when reading. Data-binding isn't easy too use and even harder to understand. But I do believe when we actually understand the code behind, nothings are in mistery since we know what data-binding looks like. After go through some projects that use data-binding, I can see the bugs related to data-binding are really hard to trace and resolve, and developes take a lot of time on it. Through this topic, we're not affraid to go deeper into generated-code to find bugs. Having knowledge about compiler help us write in the best way, not tricky way. 
Please drop a comment below to let me know which part of topic you guys aren't able to understand, and I will try my best to update, to make this topic more useful. Thanks for your time!
