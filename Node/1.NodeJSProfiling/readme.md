# NodeJS Profiling: Build a High-Performance App
Reference: [https://www.codementor.io/nodejs/tutorial/nodejs-profiling](https://www.codementor.io/nodejs/tutorial/nodejs-profiling)

A simple set of npm scripts has been created to make it easy to run the profiler:

`npm run profile-bad-script`

will run bad.js with the profiler turned on and and output .log file will be created, the file is unoptimised and loop blocking

`npm run profile-good-script`

will run good.js with the profiler turned on and and output .log file will be created, this file is optimised to not impact the event loop

`npm run analyse -- filename.log`

will analyze filename.log(replace it with your file) and it will give an output like(unptimised file):

```

> node-profiler-example@1.0.0 analyse ./CodeReference/Node/1.NodeJSProfiling
> node --prof-process "isolate-0x102001600-v8.log"

Statistical profiling result from isolate-0x102001600-v8.log, (7872 ticks, 368 unaccounted, 0 excluded).

 [Shared libraries]:
   ticks  total  nonlib   name

 [JavaScript]:
   ticks  total  nonlib   name
      1    0.0%    0.0%  Stub: CompareICStub
      1    0.0%    0.0%  LazyCompile: ~NativeModule.require bootstrap_node.js:415:34

 [C++]:
   ticks  total  nonlib   name
   7453   94.7%   94.7%  node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
     14    0.2%    0.2%  node::ContextifyScript::New(v8::FunctionCallbackInfo<v8::Value> const&)
      3    0.0%    0.0%  v8::internal::Scanner::ScanIdentifierOrKeyword()
      3    0.0%    0.0%  node::Binding(v8::FunctionCallbackInfo<v8::Value> const&)
      3    0.0%    0.0%  _mprotect
      3    0.0%    0.0%  __simple_dprintf
      2    0.0%    0.0%  node::TTYWrap::New(v8::FunctionCallbackInfo<v8::Value> const&)
      2    0.0%    0.0%  _szone_malloc_should_clear
      1    0.0%    0.0%  void v8::internal::RelocInfo::Visit<v8::internal::MarkCompactMarkingVisitor>(v8::internal::Heap*)
      1    0.0%    0.0%  void v8::internal::LookupIterator::NextInternal<false>(v8::internal::Map*, v8::internal::JSReceiver*)
      1    0.0%    0.0%  void v8::internal::BodyDescriptorBase::IteratePointers<v8::internal::MarkCompactMarkingVisitor>(v8::internal::Heap*, v8::internal::HeapObject*, int, int)
      1    0.0%    0.0%  v8::internal::StringTable::LookupKey(v8::internal::Isolate*, v8::internal::HashTableKey*)
      1    0.0%    0.0%  v8::internal::String::CalculateLineEnds(v8::internal::Handle<v8::internal::String>, bool)
      1    0.0%    0.0%  v8::internal::State::Process(v8::internal::HInstruction*, v8::internal::Zone*)
      1    0.0%    0.0%  v8::internal::ScriptContextTable::Lookup(v8::internal::Handle<v8::internal::ScriptContextTable>, v8::internal::Handle<v8::internal::String>, v8::internal::ScriptContextTable::LookupResult*)
      1    0.0%    0.0%  v8::internal::Scope::LookupLocal(v8::internal::AstRawString const*)
      1    0.0%    0.0%  v8::internal::LookupIterator::State v8::internal::LookupIterator::LookupInRegularHolder<false>(v8::internal::Map*, v8::internal::JSReceiver*)
      1    0.0%    0.0%  v8::internal::LCodeGen::DoConstantT(v8::internal::LConstantT*)
      1    0.0%    0.0%  v8::internal::LAllocator::ProcessInstructions(v8::internal::HBasicBlock*, v8::internal::BitVector*)
      1    0.0%    0.0%  v8::internal::JSObjectWalkVisitor<v8::internal::AllocationSiteCreationContext>::StructureWalk(v8::internal::Handle<v8::internal::JSObject>)
      1    0.0%    0.0%  v8::internal::InnerPointerToCodeCache::GetCacheEntry(unsigned char*)
      1    0.0%    0.0%  v8::internal::HValue::SetOperandAt(int, v8::internal::HValue*)
      1    0.0%    0.0%  v8::internal::Deserializer::ReadObject(int, v8::internal::Object**)
      1    0.0%    0.0%  v8::internal::Code::CopyFrom(v8::internal::CodeDesc const&)
      1    0.0%    0.0%  _kpersona_info
      1    0.0%    0.0%  _inet_nsap_ntoa
      1    0.0%    0.0%  _allocate_pages_securely

 [Summary]:
   ticks  total  nonlib   name
      2    0.0%    0.0%  JavaScript
   7502   95.3%   95.3%  C++
      4    0.1%    0.1%  GC
      0    0.0%          Shared libraries
    368    4.7%          Unaccounted

 [C++ entry points]:
   ticks    cpp   total   name
   7472   99.7%   94.9%  v8::internal::Builtin_HandleApiCall(int, v8::internal::Object**, v8::internal::Isolate*)
      9    0.1%    0.1%  v8::internal::Runtime_CompileLazy(int, v8::internal::Object**, v8::internal::Isolate*)
      6    0.1%    0.1%  v8::internal::Runtime_LoadIC_Miss(int, v8::internal::Object**, v8::internal::Isolate*)
      3    0.0%    0.0%  v8::internal::Runtime_StoreIC_Miss(int, v8::internal::Object**, v8::internal::Isolate*)
      1    0.0%    0.0%  v8::internal::Runtime_ToBooleanIC_Miss(int, v8::internal::Object**, v8::internal::Isolate*)
      1    0.0%    0.0%  v8::internal::Runtime_NewObject(int, v8::internal::Object**, v8::internal::Isolate*)
      1    0.0%    0.0%  v8::internal::Runtime_CreateObjectLiteral(int, v8::internal::Object**, v8::internal::Isolate*)

 [Bottom up (heavy) profile]:
  Note: percentage shows a share of a particular caller in the total
  amount of its parent calls.
  Callers occupying less than 2.0% are not shown.

   ticks parent  name
   7453   94.7%  node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
   7453  100.0%    v8::internal::Builtin_HandleApiCall(int, v8::internal::Object**, v8::internal::Isolate*)
   7453  100.0%      LazyCompile: ~pbkdf2 crypto.js:571:16
   4359   58.5%        LazyCompile: ~exports.pbkdf2Sync crypto.js:562:30
   4359  100.0%          LazyCompile: ~hash ./CodeReference/Node/1.NodeJSProfiling/index.js:3:14
   4359  100.0%            Function: ~<anonymous> ./CodeReference/Node/1.NodeJSProfiling/index.js:1:11
   3094   41.5%        LazyCompile: *hash ./CodeReference/Node/1.NodeJSProfiling/index.js:3:14
   3094  100.0%          Function: ~<anonymous> ./CodeReference/Node/1.NodeJSProfiling/index.js:1:11
   3094  100.0%            LazyCompile: ~Module._compile module.js:510:37

    368    4.7%  UNKNOWN


```