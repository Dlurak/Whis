<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>

<div class="py-6">
	<h2>Questions about Whis</h2>

	<Accordion autocollapse>
		<AccordionItem open>
			<span slot="summary" class="font-bold">Will my data be published/sent to a server?</span>
			<span slot="content">
				❌ <b>No!</b> Whis is designed to be private and secure! Everything is proccessed locally on
				your computer. Whis will never do anything nasty with your data!
			</span>
		</AccordionItem>
		<AccordionItem>
			<span slot="summary" class="font-bold">Is Whis open-source?</span>
			<span slot="content">
				✅ <b>Yes!</b> While open source software is important for everything, for something working
				with sensitive data such as a decrypted chat, you shouldn't even consider something proprietary
			</span>
		</AccordionItem>
		<AccordionItem>
			<span slot="summary" class="font-bold">Can chats from other programms be analyzed?</span>
			<span slot="content">
				✅ <b>Yes!</b> Currently Whis can analyze chats exported from WhatsApp (both android or ios)
				as well as chats from Element. <br />
				If you are a developer you can implement a custom parser for another program and open a pr {`<3`}
			</span>
		</AccordionItem>
	</Accordion>
</div>
