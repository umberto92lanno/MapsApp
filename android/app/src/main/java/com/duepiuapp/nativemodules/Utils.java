package com.duepiuapp.nativemodules;

import android.content.Context;
import android.content.DialogInterface;
import android.os.Build;
import android.view.ContextThemeWrapper;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatDelegate;

import com.duepiuapp.R;

import java.util.Timer;
import java.util.TimerTask;

interface UtilsCallback {
    void success();
    void error();
}

public class Utils {
    Timer timer = new Timer();
    boolean isDarkMode() {
        return AppCompatDelegate.getDefaultNightMode() == AppCompatDelegate.MODE_NIGHT_YES;
    }
    int getAndroidVersion() {
        return Build.VERSION.SDK_INT;
    }

    void setTimer(long time, UtilsCallback callback) {
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                callback.success();
            }
        }, 1, time * 1000);
    }

    void showAlert(Context context, UtilsCallback callback) {
        AlertDialog alertDialog = new AlertDialog.Builder(context, R.style.Theme_AppCompat_Light)
                .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        callback.success();
                    }
                })
                .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        callback.error();
                    }
                })
                .setTitle("Alert")
                .setCancelable(false)
                .create();
        alertDialog.show();

    }
}
