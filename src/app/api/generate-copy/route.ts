import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// Remove unused GROQ_API_KEY
// const GROQ_API_KEY = process.env.GROQ_API_KEY

// Mock AI responses for demo purposes
const mockResponses = {
  email: {
    title: 'Launch Email Sequence',
    content: `Subject: 🚀 Something BIG is coming...

Hey [Name],

I've been working on something that's going to change how [TARGET_AUDIENCE] approach [PRODUCT_CATEGORY].

After months of development, [PRODUCT_NAME] is almost ready to launch.

Here's what makes it special:
✅ [Key Benefit 1]
✅ [Key Benefit 2] 
✅ [Key Benefit 3]

I'm opening early access to just 100 people next week.

Want to be first in line?

Reply "YES" and I'll add you to the VIP list.

Talk soon,
[Your Name]

P.S. Early birds get 50% off the regular price 🐦`
  },
  hook: {
    title: 'Social Media Hook',
    content: `🔥 THREAD: How I built [PRODUCT_NAME] in 30 days

After seeing [TARGET_AUDIENCE] struggle with [PROBLEM], I knew I had to build something.

Here's the story 👇

1/ The problem was clear:
[TARGET_AUDIENCE] were spending hours on [TASK] when it should take minutes.

2/ I started with a simple question:
"What if this could be automated?"

3/ 30 days later, [PRODUCT_NAME] was born.

It helps [TARGET_AUDIENCE]:
• [Benefit 1]
• [Benefit 2]
• [Benefit 3]

4/ The results speak for themselves:
✅ 10x faster [PROCESS]
✅ 90% less manual work
✅ Happy customers

Launching next week. Who wants early access? 👀

#SaaS #Productivity #Launch`
  },
  sales: {
    title: 'Sales Page Copy',
    content: `# Finally, A Solution That Actually Works for [TARGET_AUDIENCE]

## Stop Wasting Time on [PROBLEM] - [PRODUCT_NAME] Does It All For You

If you're a [TARGET_AUDIENCE] who's tired of [PAIN_POINT], you're in the right place.

### Here's What You Get:

**🎯 Feature 1: [Main Benefit]**
No more [old way]. Now you can [new way] in just minutes.

**⚡ Feature 2: [Speed Benefit]**
What used to take hours now takes minutes. Seriously.

**🔒 Feature 3: [Security/Reliability]**
Built with enterprise-grade security. Your data is safe.

### The Results?

> "[PRODUCT_NAME] saved me 10 hours per week. I can finally focus on growing my business instead of [MANUAL_TASK]." - Sarah K., [TARGET_AUDIENCE]

### Pricing That Makes Sense

**Starter Plan - $29/month**
- Perfect for solo [TARGET_AUDIENCE]
- All core features included
- Email support

**Pro Plan - $99/month**
- Everything in Starter
- Advanced features
- Priority support
- Team collaboration

### 30-Day Money-Back Guarantee

Try [PRODUCT_NAME] risk-free. If you're not completely satisfied, get a full refund.

[GET STARTED NOW - 50% OFF FIRST MONTH]

*Limited time offer for early adopters*`
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, productName, targetAudience } = await request.json()

    // Get user from session
    const supabase = createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Check usage limits for starter plan
    if (profile.plan === 'starter' && profile.usage_count >= 3) {
      return NextResponse.json(
        { error: 'Usage limit reached. Upgrade to Pro for unlimited generations.' },
        { status: 403 }
      )
    }

    // Generate content (using mock for demo)
    const response = mockResponses[type as keyof typeof mockResponses]
    
    if (!response) {
      return NextResponse.json({ error: 'Invalid generation type' }, { status: 400 })
    }

    // Replace placeholders with actual values
    const content = response.content  // Changed from 'let' to 'const'
      .replace(/\[PRODUCT_NAME\]/g, productName)
      .replace(/\[TARGET_AUDIENCE\]/g, targetAudience)
      .replace(/\[Name\]/g, 'there')
      .replace(/\[Your Name\]/g, 'The LaunchMate Team')

    // Update usage count
    await supabase
      .from('profiles')
      .update({ usage_count: profile.usage_count + 1 })
      .eq('id', user.id)

    return NextResponse.json({
      title: response.title,
      content,
      type
    })

  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}