package com.flipthescript;

import android.content.Context;
import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class ReverseAudioModule extends ReactContextBaseJavaModule {
    ReverseAudioModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "ReverseAudioModule";
    }

    @ReactMethod
    public void reverseAudioRecordingEvent(String name) {
        Toast toast = Toast.makeText(getReactApplicationContext(), name, Toast.LENGTH_SHORT);
        toast.show();
    }
}
