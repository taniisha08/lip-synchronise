angular
  .module("InterviewBotApp", [])
  .controller("InterviewController", function ($scope) {
    let model,
      mixer,
      clock = new THREE.Clock();
    const scene = new THREE.Scene();
    let speech;
    let updateInterval;
    let blinkingInterval = null;
    let url ="resources/avatars/brunette.glb"; 

    // Viseme mapping (same as before)
    const corresponding = {
      A: "viseme_PP",
      B: "viseme_kk",
      C: "viseme_I",
      D: "viseme_AA",
      E: "viseme_O",
      F: "viseme_U",
      G: "viseme_FF",
      H: "viseme_TH",
      I: "viseme_ee", // Viseme for 'ee' (mouth wide)
      J: "viseme_ch", // Viseme for 'ch' (tongue behind teeth)
      K: "viseme_kk", // Viseme for 'k' (closed lips)
      L: "viseme_L", // Viseme for 'l' (mouth slightly open)
      M: "viseme_M", // Viseme for 'm' (mouth closed)
      N: "viseme_N", // Viseme for 'n' (mouth open, tongue up)
      O: "viseme_O", // Viseme for 'oh' (rounded lips)
      P: "viseme_PP", // Viseme for 'p' (lips pressed together)
      Q: "viseme_Q", // Viseme for 'qu' (mouth slightly open, tongue down)
      R: "viseme_R", // Viseme for 'r' (tongue curled)
      S: "viseme_S", // Viseme for 's' (teeth together)
      T: "viseme_T", // Viseme for 't' (tongue behind teeth)
      U: "viseme_U", // Viseme for 'oo' (rounded lips)
      V: "viseme_V", // Viseme for 'v' (teeth on lower lip)
      W: "viseme_W", // Viseme for 'w' (rounded lips)
      X: "viseme_X", // Viseme for 'x' (mouth closed, lips slightly apart)
      Y: "viseme_Y", // Viseme for 'y' (lips slightly spread)
      Z: "viseme_Z", // Viseme for 'z' (teeth together, lips spread)
    };

    // Lip-sync cue structure (we can define this based on known phonemes in your TTS voice)
    const lipsync = {
      mouthCues: [
        {
          start: 0,
          end: 0.02,
          value: "X",
        },
        {
          start: 0.02,
          end: 0.61,
          value: "B",
        },
        {
          start: 0.61,
          end: 0.68,
          value: "C",
        },
        {
          start: 0.68,
          end: 0.76,
          value: "A",
        },
        {
          start: 0.76,
          end: 0.96,
          value: "B",
        },
        {
          start: 0.96,
          end: 1.17,
          value: "C",
        },
        {
          start: 1.17,
          end: 1.31,
          value: "B",
        },
        {
          start: 1.31,
          end: 1.45,
          value: "E",
        },
        {
          start: 1.45,
          end: 1.52,
          value: "F",
        },
        {
          start: 1.52,
          end: 1.68,
          value: "B",
        },
        {
          start: 1.68,
          end: 1.79,
          value: "E",
        },
        {
          start: 1.79,
          end: 1.86,
          value: "F",
        },
        {
          start: 1.86,
          end: 2,
          value: "C",
        },
        {
          start: 2,
          end: 2.21,
          value: "F",
        },
        {
          start: 2.21,
          end: 2.28,
          value: "D",
        },
        {
          start: 2.28,
          end: 2.41,
          value: "A",
        },
        {
          start: 2.41,
          end: 2.54,
          value: "B",
        },
        {
          start: 2.54,
          end: 2.63,
          value: "A",
        },
        {
          start: 2.63,
          end: 2.7,
          value: "C",
        },
        {
          start: 2.7,
          end: 2.9,
          value: "B",
        },
        {
          start: 2.9,
          end: 2.97,
          value: "C",
        },
        {
          start: 2.97,
          end: 3.11,
          value: "D",
        },
        {
          start: 3.11,
          end: 3.18,
          value: "C",
        },
        {
          start: 3.18,
          end: 3.26,
          value: "A",
        },
        {
          start: 3.26,
          end: 3.4,
          value: "H",
        },
        {
          start: 3.4,
          end: 3.47,
          value: "C",
        },
        {
          start: 3.47,
          end: 3.61,
          value: "B",
        },
        {
          start: 3.61,
          end: 3.68,
          value: "C",
        },
        {
          start: 3.68,
          end: 3.75,
          value: "B",
        },
        {
          start: 3.75,
          end: 3.83,
          value: "A",
        },
        {
          start: 3.83,
          end: 3.92,
          value: "C",
        },
        {
          start: 3.92,
          end: 4.2,
          value: "B",
        },
        {
          start: 4.2,
          end: 4.27,
          value: "F",
        },
        {
          start: 4.27,
          end: 4.75,
          value: "B",
        },
        {
          start: 4.75,
          end: 4.88,
          value: "A",
        },
        {
          start: 4.88,
          end: 4.93,
          value: "B",
        },
        {
          start: 4.93,
          end: 5.04,
          value: "C",
        },
        {
          start: 5.04,
          end: 5.39,
          value: "B",
        },
        {
          start: 5.39,
          end: 5.46,
          value: "G",
        },
        {
          start: 5.46,
          end: 5.53,
          value: "C",
        },
        {
          start: 5.53,
          end: 5.67,
          value: "B",
        },
        {
          start: 5.67,
          end: 5.75,
          value: "A",
        },
        {
          start: 5.75,
          end: 5.84,
          value: "B",
        },
        {
          start: 5.84,
          end: 5.99,
          value: "X",
        },
        {
          start: 5.99,
          end: 6.1,
          value: "B",
        },
        {
          start: 6.1,
          end: 7.1,
          value: "X",
        },
        {
          start: 7.1,
          end: 7.22,
          value: "A",
        },
        {
          start: 7.22,
          end: 7.52,
          value: "B",
        },
        {
          start: 7.52,
          end: 7.59,
          value: "H",
        },
        {
          start: 7.59,
          end: 7.66,
          value: "C",
        },
        {
          start: 7.66,
          end: 7.74,
          value: "A",
        },
        {
          start: 7.74,
          end: 7.89,
          value: "E",
        },
        {
          start: 7.89,
          end: 7.96,
          value: "C",
        },
        {
          start: 7.96,
          end: 8.1,
          value: "D",
        },
        {
          start: 8.1,
          end: 8.17,
          value: "C",
        },
        {
          start: 8.17,
          end: 8.31,
          value: "B",
        },
        {
          start: 8.31,
          end: 8.45,
          value: "C",
        },
        {
          start: 8.45,
          end: 8.57,
          value: "A",
        },
        {
          start: 8.57,
          end: 9.12,
          value: "F",
        },
        {
          start: 9.12,
          end: 9.33,
          value: "B",
        },
        {
          start: 9.33,
          end: 9.54,
          value: "C",
        },
        {
          start: 9.54,
          end: 9.61,
          value: "B",
        },
        {
          start: 9.61,
          end: 9.68,
          value: "C",
        },
        {
          start: 9.68,
          end: 9.75,
          value: "B",
        },
        {
          start: 9.75,
          end: 9.82,
          value: "C",
        },
        {
          start: 9.82,
          end: 9.89,
          value: "E",
        },
        {
          start: 9.89,
          end: 10.1,
          value: "F",
        },
        {
          start: 10.1,
          end: 10.18,
          value: "A",
        },
        {
          start: 10.18,
          end: 10.31,
          value: "E",
        },
        {
          start: 10.31,
          end: 10.45,
          value: "G",
        },
        {
          start: 10.45,
          end: 10.52,
          value: "E",
        },
        {
          start: 10.52,
          end: 10.6,
          value: "A",
        },
        {
          start: 10.6,
          end: 10.85,
          value: "B",
        },
        {
          start: 10.85,
          end: 11.2,
          value: "F",
        },
        {
          start: 11.2,
          end: 11.69,
          value: "X",
        },
        {
          start: 11.69,
          end: 12.56,
          value: "F",
        },
        {
          start: 12.56,
          end: 12.63,
          value: "B",
        },
        {
          start: 12.63,
          end: 12.7,
          value: "G",
        },
        {
          start: 12.7,
          end: 12.77,
          value: "B",
        },
        {
          start: 12.77,
          end: 12.98,
          value: "C",
        },
        {
          start: 12.98,
          end: 13.05,
          value: "H",
        },
        {
          start: 13.05,
          end: 13.26,
          value: "B",
        },
        {
          start: 13.26,
          end: 13.33,
          value: "C",
        },
        {
          start: 13.33,
          end: 13.61,
          value: "B",
        },
        {
          start: 13.61,
          end: 14.08,
          value: "X",
        },
        {
          start: 14.08,
          end: 14.12,
          value: "C",
        },
        {
          start: 14.12,
          end: 14.3,
          value: "B",
        },
        {
          start: 14.3,
          end: 14.37,
          value: "D",
        },
        {
          start: 14.37,
          end: 14.46,
          value: "A",
        },
        {
          start: 14.46,
          end: 14.54,
          value: "B",
        },
        {
          start: 14.54,
          end: 14.62,
          value: "A",
        },
        {
          start: 14.62,
          end: 14.72,
          value: "C",
        },
        {
          start: 14.72,
          end: 14.79,
          value: "B",
        },
        {
          start: 14.79,
          end: 14.86,
          value: "C",
        },
        {
          start: 14.86,
          end: 15.14,
          value: "B",
        },
        {
          start: 15.14,
          end: 15.21,
          value: "C",
        },
        {
          start: 15.21,
          end: 15.56,
          value: "B",
        },
        {
          start: 15.56,
          end: 15.84,
          value: "F",
        },
        {
          start: 15.84,
          end: 16,
          value: "A",
        },
        {
          start: 16,
          end: 16.14,
          value: "H",
        },
        {
          start: 16.14,
          end: 16.21,
          value: "D",
        },
        {
          start: 16.21,
          end: 16.28,
          value: "B",
        },
        {
          start: 16.28,
          end: 16.49,
          value: "F",
        },
        {
          start: 16.49,
          end: 16.56,
          value: "B",
        },
        {
          start: 16.56,
          end: 16.64,
          value: "A",
        },
        {
          start: 16.64,
          end: 16.88,
          value: "F",
        },
        {
          start: 16.88,
          end: 16.95,
          value: "G",
        },
        {
          start: 16.95,
          end: 17.16,
          value: "B",
        },
        {
          start: 17.16,
          end: 17.23,
          value: "F",
        },
        {
          start: 17.23,
          end: 17.58,
          value: "B",
        },
        {
          start: 17.58,
          end: 17.65,
          value: "G",
        },
        {
          start: 17.65,
          end: 18.4,
          value: "B",
        },
        {
          start: 18.4,
          end: 18.45,
          value: "F",
        },
        {
          start: 18.45,
          end: 18.5,
          value: "B",
        },
        {
          start: 18.5,
          end: 18.57,
          value: "C",
        },
        {
          start: 18.57,
          end: 18.64,
          value: "B",
        },
        {
          start: 18.64,
          end: 18.78,
          value: "D",
        },
        {
          start: 18.78,
          end: 18.85,
          value: "C",
        },
        {
          start: 18.85,
          end: 18.93,
          value: "A",
        },
        {
          start: 18.93,
          end: 19.01,
          value: "B",
        },
        {
          start: 19.01,
          end: 19.09,
          value: "A",
        },
        {
          start: 19.09,
          end: 19.14,
          value: "C",
        },
        {
          start: 19.14,
          end: 19.4,
          value: "B",
        },
        {
          start: 19.4,
          end: 19.47,
          value: "C",
        },
        {
          start: 19.47,
          end: 19.54,
          value: "B",
        },
        {
          start: 19.54,
          end: 19.68,
          value: "C",
        },
        {
          start: 19.68,
          end: 19.75,
          value: "B",
        },
        {
          start: 19.75,
          end: 19.96,
          value: "C",
        },
        {
          start: 19.96,
          end: 20.53,
          value: "B",
        },
        {
          start: 20.53,
          end: 20.59,
          value: "E",
        },
        {
          start: 20.59,
          end: 20.84,
          value: "D",
        },
        {
          start: 20.84,
          end: 20.89,
          value: "C",
        },
        {
          start: 20.89,
          end: 21.07,
          value: "B",
        },
        {
          start: 21.07,
          end: 21.21,
          value: "C",
        },
        {
          start: 21.21,
          end: 21.28,
          value: "E",
        },
        {
          start: 21.28,
          end: 21.35,
          value: "B",
        },
        {
          start: 21.35,
          end: 21.49,
          value: "C",
        },
        {
          start: 21.49,
          end: 21.56,
          value: "B",
        },
        {
          start: 21.56,
          end: 21.66,
          value: "A",
        },
        {
          start: 21.66,
          end: 21.81,
          value: "B",
        },
        {
          start: 21.81,
          end: 21.84,
          value: "X",
        },
        {
          start: 21.84,
          end: null,
          value: "X",
        },
      ],
    };

    console.log("Controller initialized");

    // Three.js Scene Initialization
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("3d-avatar").appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    loader.load(
      "resources/textures/bg2.jpg",
      (texture) => {
        console.log("Background texture loaded successfully.");
        scene.background = texture;
      },
      undefined,
      (error) => {
        console.error("Error loading background texture:", error);
      }
    );

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(ambientLight, directionalLight);

    // GLB Model Loading
    const gltfLoader = new THREE.GLTFLoader();
   launchAvatar(url);

    function launchAvatar(url){
        gltfLoader.load(
            url,
            (gltf) => {
              console.log("GLB model loaded.");
              model = gltf.scene;
              scene.add(model);
              model.position.set(0, -2.35, 0);
              model.scale.set(1.5, 1.5, 1.5);
              camera.position.set(0, 0, 1);
      
              mixer = new THREE.AnimationMixer(model);
              setupBlinking();
              gltf.animations.forEach((clip) => {
                const action = mixer.clipAction(clip);
                action.play();
              });
      
              animate();
            },
            undefined,
            (error) => {
              console.error("Error loading GLB model:", error.message || error);
            }
          );
    }
   
    function updateLipSync(currentTime) {
      if (!model) {
        console.warn("Model not initialized yet.");
        return;
      }

      const head = model.getObjectByName("Wolf3D_Head");
      const teeth = model.getObjectByName("Wolf3D_Teeth");

      if (!head || !teeth) {
        console.warn("Head or Teeth object not found in model.");
        return;
      }

      const morphTargetSmoothing = 0.19;

      Object.values(corresponding).forEach((viseme) => {
        if (head.morphTargetDictionary[viseme] !== undefined) {
          const index = head.morphTargetDictionary[viseme];
          head.morphTargetInfluences[index] = THREE.MathUtils.lerp(
            head.morphTargetInfluences[index],
            0,
            morphTargetSmoothing
          );
          teeth.morphTargetInfluences[index] = THREE.MathUtils.lerp(
            teeth.morphTargetInfluences[index],
            0,
            morphTargetSmoothing
          );
        }
      });

      lipsync.mouthCues.forEach((cue) => {
        if (currentTime >= cue.start && currentTime <= cue.end) {
          const target = corresponding[cue.value];
          if (head.morphTargetDictionary[target] !== undefined) {
            const index = head.morphTargetDictionary[target];
            head.morphTargetInfluences[index] = THREE.MathUtils.lerp(
              head.morphTargetInfluences[index],
              1,
              morphTargetSmoothing
            );
            teeth.morphTargetInfluences[index] = THREE.MathUtils.lerp(
              teeth.morphTargetInfluences[index],
              1,
              morphTargetSmoothing
            );
          }
        }
      });
    }

    function resetLipSync() {
      if (!model) {
        console.warn("Model not initialized yet.");
        return;
      }

      const head = model.getObjectByName("Wolf3D_Head");
      const teeth = model.getObjectByName("Wolf3D_Teeth");

      if (!head || !teeth) {
        console.warn("Head or Teeth object not found in model.");
        return;
      }

      Object.values(corresponding).forEach((viseme) => {
        if (head.morphTargetDictionary[viseme] !== undefined) {
          head.morphTargetInfluences[head.morphTargetDictionary[viseme]] = 0;
          teeth.morphTargetInfluences[teeth.morphTargetDictionary[viseme]] = 0;
        }
      });
    }

    function setupBlinking() {
      if (blinkingInterval !== null) return; // Don't start a new interval if one is already running

      blinkingInterval = setInterval(() => {
        const head = model.getObjectByName("Wolf3D_Head");
        if (!head) return;

        const morphTargets = head.morphTargetDictionary;
        const influences = head.morphTargetInfluences;

        // Check if both blink morph targets exist
        if (
          morphTargets["eyeBlinkLeft"] !== undefined &&
          morphTargets["eyeBlinkRight"] !== undefined
        ) {
          const blinkLeftIndex = morphTargets["eyeBlinkLeft"];
          const blinkRightIndex = morphTargets["eyeBlinkRight"];

          // Set both eyes to blink
          influences[blinkLeftIndex] = 1;
          influences[blinkRightIndex] = 1;

          // Reset both eyes after blinking
          setTimeout(() => {
            influences[blinkLeftIndex] = 0;
            influences[blinkRightIndex] = 0;
          }, 200); // Duration of the blink
        }
      }, THREE.MathUtils.randInt(1000, 5000)); // Random interval for natural blinking
    }

    // Optionally clear the blinking interval when done (e.g., if model is removed from scene)
    function clearBlinking() {
      if (blinkingInterval !== null) {
        clearInterval(blinkingInterval);
        blinkingInterval = null;
      }
    }

    $scope.speakQuestion = function () {
      const audioFile = "resources/audios/audio2.wav"; // Path to your audio file

      const audio = new Audio(audioFile);
      console.log("Playing audio:", audioFile);

      audio.onplay = function () {
        console.log("Audio playback started.");
        const startTime = Date.now();

        updateInterval = setInterval(() => {
          const currentTime = (Date.now() - startTime) / 1000;
          updateLipSync(currentTime);
        }, 16);
      };

      audio.onended = function () {
        console.log("Audio playback ended.");
        clearInterval(updateInterval);
        resetLipSync();
      };

      audio.onerror = function (event) {
        console.error("Audio playback error:", event);
        clearInterval(updateInterval);
        resetLipSync();
      };

      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
        resetLipSync();
      });
    };

    $scope.nextQuestion = function () {
      console.log("Next question triggered.");

      $scope.speakQuestion(); // Play the audio file for the next question
    };

    $scope.changeAvatar = function (url) {
        // Remove the existing avatar from the scene if it exists
        if (model) {
            console.log("model changed")
          scene.remove(model);
          model = null; // Clear the reference to the old avatar
        }
      clearBlinking();
        launchAvatar(url);
      };

    function animate() {
      requestAnimationFrame(animate);
      if (mixer) mixer.update(clock.getDelta());
      renderer.render(scene, camera);
    }
    $scope.$on("$destroy", function () {
      console.log("Cleaning up resources.");
      if (speech) {
        window.speechSynthesis.cancel();
      }
      resetLipSync();
      clearBlinking();
      renderer.dispose();
    });
  });
