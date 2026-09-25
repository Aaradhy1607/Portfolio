// High-Tech Web Audio API Procedural Synthesizer for "The Aaradhy Universe"

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // muted by default for clean user experience
  private spaceDroneOsc: OscillatorNode | null = null;
  private spaceDroneGain: GainNode | null = null;
  private cockpitHumOsc: OscillatorNode | null = null;
  private cockpitHumGain: GainNode | null = null;

  constructor() {
    // Lazy initialize on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
      this.playConfirm();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public startAmbient() {
    if (this.isMuted || !this.ctx) return;

    try {
      this.stopAmbient();

      // Deep Space Sub-Bass Drone (38Hz - 45Hz)
      this.spaceDroneOsc = this.ctx.createOscillator();
      this.spaceDroneGain = this.ctx.createGain();
      const spaceFilter = this.ctx.createBiquadFilter();

      this.spaceDroneOsc.type = 'sine';
      this.spaceDroneOsc.frequency.setValueAtTime(42, this.ctx.currentTime);
      
      spaceFilter.type = 'lowpass';
      spaceFilter.frequency.setValueAtTime(80, this.ctx.currentTime);

      this.spaceDroneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.spaceDroneGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);

      this.spaceDroneOsc.connect(spaceFilter);
      spaceFilter.connect(this.spaceDroneGain);
      this.spaceDroneGain.connect(this.ctx.destination);
      this.spaceDroneOsc.start();

      // Cockpit Reactor Resonant Hum (110Hz with slight harmonic modulation)
      this.cockpitHumOsc = this.ctx.createOscillator();
      this.cockpitHumGain = this.ctx.createGain();
      const humFilter = this.ctx.createBiquadFilter();

      this.cockpitHumOsc.type = 'sawtooth';
      this.cockpitHumOsc.frequency.setValueAtTime(110, this.ctx.currentTime);

      humFilter.type = 'bandpass';
      humFilter.frequency.setValueAtTime(220, this.ctx.currentTime);
      humFilter.Q.setValueAtTime(3, this.ctx.currentTime);

      this.cockpitHumGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.cockpitHumGain.gain.exponentialRampToValueAtTime(0.03, this.ctx.currentTime + 4);

      this.cockpitHumOsc.connect(humFilter);
      humFilter.connect(this.cockpitHumGain);
      this.cockpitHumGain.connect(this.ctx.destination);
      this.cockpitHumOsc.start();
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public stopAmbient() {
    try {
      if (this.spaceDroneOsc) {
        this.spaceDroneOsc.stop();
        this.spaceDroneOsc.disconnect();
        this.spaceDroneOsc = null;
      }
      if (this.cockpitHumOsc) {
        this.cockpitHumOsc.stop();
        this.cockpitHumOsc.disconnect();
        this.cockpitHumOsc = null;
      }
    } catch {
      // safe cleanup
    }
  }

  public playHover() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {}
  }

  public playClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(500, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  public playWarp() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 1.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(4000, this.ctx.currentTime + 1.0);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 1.8);
    } catch {}
  }

  public playConfirm() {
    if (this.isMuted || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.05);

        gain.gain.setValueAtTime(0.04, this.ctx!.currentTime + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + i * 0.05 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(this.ctx!.currentTime + i * 0.05);
        osc.stop(this.ctx!.currentTime + i * 0.05 + 0.2);
      });
    } catch {}
  }

  public playAnomaly() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.setValueAtTime(600, this.ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(200, this.ctx.currentTime + 0.2);
      osc.frequency.setValueAtTime(900, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.6);
    } catch {}
  }
}

export const sound = new SoundEngine();
