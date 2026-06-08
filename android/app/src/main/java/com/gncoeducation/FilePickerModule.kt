package com.gncoeducation

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.*

class FilePickerModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var mPickerPromise: Promise? = null
    private val PICK_FILE_REQUEST = 1001

    override fun getName(): String = "FilePicker"

    // PDF Picker
    @ReactMethod
    fun pickPdf(promise: Promise) {

        val activity = reactContext.currentActivity

        if (activity == null) {
            promise.reject("ERROR", "Activity is null")
            return
        }

        mPickerPromise = promise

        val intent = Intent(Intent.ACTION_GET_CONTENT).apply {
            type = "application/pdf"
            addCategory(Intent.CATEGORY_OPENABLE)
            putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true)
        }

        activity.startActivityForResult(
            Intent.createChooser(intent, "Select PDF"),
            PICK_FILE_REQUEST
        )
    }

    // Excel Picker
    @ReactMethod
    fun pickExcel(promise: Promise) {

        val activity = reactContext.currentActivity

        if (activity == null) {
            promise.reject("ERROR", "Activity is null")
            return
        }

        mPickerPromise = promise

        val intent = Intent(Intent.ACTION_GET_CONTENT).apply {

            type = "*/*"

            putExtra(
                Intent.EXTRA_MIME_TYPES,
                arrayOf(
                    "application/vnd.ms-excel",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                )
            )

            addCategory(Intent.CATEGORY_OPENABLE)
            putExtra(Intent.EXTRA_ALLOW_MULTIPLE, false)
        }

        activity.startActivityForResult(
            Intent.createChooser(intent, "Select Excel File"),
            PICK_FILE_REQUEST
        )
    }

    fun onActivityResult(
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {

        if (requestCode != PICK_FILE_REQUEST) return

        if (resultCode == Activity.RESULT_OK && data != null) {

            val files = Arguments.createArray()

            if (data.clipData != null) {

                val count = data.clipData!!.itemCount

                for (i in 0 until count) {

                    val uri = data.clipData!!.getItemAt(i).uri

                    val file = Arguments.createMap().apply {
                        putString("uri", uri.toString())
                        putString(
                            "name",
                            uri.lastPathSegment ?: "file"
                        )
                    }

                    files.pushMap(file)
                }
            } else if (data.data != null) {

                val uri = data.data!!

                val file = Arguments.createMap().apply {
                    putString("uri", uri.toString())
                    putString(
                        "name",
                        uri.lastPathSegment ?: "file"
                    )
                }

                files.pushMap(file)
            }

            mPickerPromise?.resolve(files)
            mPickerPromise = null

        } else {

            mPickerPromise?.reject(
                "CANCEL",
                "User cancelled"
            )

            mPickerPromise = null
        }
    }
}